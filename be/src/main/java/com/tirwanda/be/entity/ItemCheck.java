package com.tirwanda.be.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemCheck extends BaseEntity<String> implements Serializable {

    @Serial
    private static final long serialVersionUID = 8654920547260620681L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long itemCheckId;

    @NotEmpty(message = "Item check is required")
    private String itemCheck;

    @NotEmpty(message = "Status is required")
    private Boolean status;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ItemCheck itemCheck = (ItemCheck) o;
        return itemCheckId != null && Objects.equals(itemCheckId, itemCheck.itemCheckId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
