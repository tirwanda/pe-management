package com.tirwanda.be.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
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
public class ReplacedParts extends BaseEntity<String> implements Serializable {

    @Serial
    private static final long serialVersionUID = -7467558859981275275L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long replacedPartId;

    @NotEmpty(message = "Part number is required")
    private String partNumber;

    @NotEmpty(message = "Part name is required")
    private String partName;

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    @NotEmpty(message = "UOM is required")
    private String uom;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ReplacedParts that = (ReplacedParts) o;
        return replacedPartId != null && Objects.equals(replacedPartId, that.replacedPartId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
