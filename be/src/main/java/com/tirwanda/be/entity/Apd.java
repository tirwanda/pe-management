package com.tirwanda.be.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Apd extends BaseEntity<String> implements Serializable {

    @Serial
    private static final long serialVersionUID = 9123205449981884012L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long apdId;

    @Column(nullable = false, unique = true)
    private String apdName;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Apd apd = (Apd) o;
        return apdId != null && Objects.equals(apdId, apd.apdId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
