package com.tirwanda.be.config;

import com.tirwanda.be.filter.CustomAuthenticationFilter;
import com.tirwanda.be.filter.CustomAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.http.HttpMethod.*;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean());
        customAuthenticationFilter.setFilterProcessesUrl("/api/login");

        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers( "/api/login", "/api/role/save", "/api/user/save", "/api/token/refresh/**").permitAll();
        http.authorizeRequests().antMatchers("/swagger-ui/**").permitAll();
        http.authorizeRequests().antMatchers("/v2/api-docs").permitAll();

        // GET Mapping Authorization
        http.authorizeRequests().antMatchers(GET, "/api/users/**",
                        "/api/role/**",
                        "/api/roles/**")
                .hasAnyAuthority("ROLE_ADMIN");

        http.authorizeRequests().antMatchers(GET, "/api/report-downtime/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER", "ROLE_ENGINEER");

        http.authorizeRequests().antMatchers(GET, "/api/user/**",
                        "/api/line/**",
                        "/api/lines/**",
                        "/api/asset/**",
                        "/api/dashboard/**",
                        "/api/apd/**",
                        "/api/part/**",
                        "/api/downtime/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER", "ROLE_ENGINEER", "ROLE_PRODUCTION");

        // POST Mapping Authorization
        http.authorizeRequests().antMatchers(POST, "/api/user/**",
                        "/api/role/**")
                .hasAnyAuthority("ROLE_ADMIN");

        http.authorizeRequests().antMatchers(POST, "/api/line/**",
                        "/api/apd/**",
                        "/api/part/**",
                        "/api/asset/**",
                        "/api/report-downtime")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER", "ROLE_ENGINEER");

        http.authorizeRequests().antMatchers(POST, "/api/downtime/**",
                        "/api/form-downtime/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_ENGINEER", "ROLE_PRODUCTION");

        // PUT Mapping Authorization
        http.authorizeRequests().antMatchers(PUT, "/api/role/**")
                .hasAnyAuthority("ROLE_ADMIN");

        http.authorizeRequests().antMatchers(PUT, "/api/downtime/approval")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER");

        http.authorizeRequests().antMatchers(PUT, "/api/line/**",
                        "/api/asset/**",
                        "/api/part/**",
                        "/api/apd/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER", "ROLE_ENGINEER");

        http.authorizeRequests().antMatchers(PUT, "/api/user/**",
                        "/api/downtime/update")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER", "ROLE_ENGINEER", "ROLE_PRODUCTION");

        // DELETE Mapping Authorization
        http.authorizeRequests().antMatchers(DELETE, "/api/user/**",
                        "/api/role/**")
                .hasAnyAuthority("ROLE_ADMIN");

        http.authorizeRequests().antMatchers(DELETE, "/api/line/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER");

        http.authorizeRequests().antMatchers(DELETE, "/api/asset/**",
                        "/api/part/**",
                        "/api/asset/**",
                        "/api/apd/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER", "ROLE_ENGINEER");

        http.authorizeRequests().antMatchers(DELETE, "/api/downtime/**")
                .hasAnyAuthority("ROLE_ADMIN", "ROLE_MANAGER", "ROLE_ENGINEER", "ROLE_PRODUCTION");

        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(customAuthenticationFilter);
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

        http.cors();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/v2/api-docs",
                "/configuration/ui",
                "/swagger-resources/**",
                "/configuration/security",
                "/swagger-ui.html",
                "/webjars/**");
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*").allowedMethods("PUT", "DELETE",
                        "GET", "POST");
            }
        };
    }
}
