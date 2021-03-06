package com.tirwanda.be.entity;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity<String> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    @Column(nullable = false, unique = true)
    @NotEmpty(message = "Username is required")
    private String username;

    @Column(nullable = false, unique = true)
    @NotEmpty(message = "Email is required")
    private String email;

    @Column(nullable = false)
    @NotEmpty(message = "Password is required")
    private String password;

    @Column(nullable = false, unique = true)
    @NotNull(message = "NRP is required")
    private Integer nrp;

    private String name;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    private String section;

    private Integer extension;

    private String location;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "department_Id", referencedColumnName = "departmentId")
    private Department department;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "division_id", referencedColumnName = "divisionId")
    private Division division;

    @OneToMany(targetEntity = Line.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    @LazyCollection(LazyCollectionOption.FALSE)
    @ToString.Exclude
    private List<Line> lines = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return userId != null && Objects.equals(userId, user.userId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
