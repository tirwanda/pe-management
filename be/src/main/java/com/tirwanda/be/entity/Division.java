package com.tirwanda.be.entity;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Division extends BaseEntity<String> implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long divisionId;

    @NotEmpty(message = "Division name is required")
    @Column(nullable = false, unique = true)
    private String divisionName;

    @OneToMany(targetEntity = Department.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "division_id", referencedColumnName = "divisionId")
    @LazyCollection(LazyCollectionOption.FALSE)
    @ToString.Exclude
    private List<Department> department;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Division division = (Division) o;
        return divisionId != null && Objects.equals(divisionId, division.divisionId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
