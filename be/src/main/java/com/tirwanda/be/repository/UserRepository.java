package com.tirwanda.be.repository;

import com.tirwanda.be.dto.projection.CustomUserDetail;
import com.tirwanda.be.entity.Line;
import com.tirwanda.be.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findBySection(String section);
    User findUserByLinesContaining(Line line);

    @Query("SELECT new com.tirwanda.be.dto.projection.CustomUserDetail(u.userId, u.username, u.email, u.nrp, u.name, u.description, u.section, u.extension, u.location) FROM User u WHERE u.username = ?1")
    CustomUserDetail findCustomUserDetail(String username);
}
