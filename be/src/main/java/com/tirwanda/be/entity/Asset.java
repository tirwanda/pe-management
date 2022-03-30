package com.tirwanda.be.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
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
public class Asset extends BaseEntity<String> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long assetId;

    @NotEmpty(message = "Asset number is required")
    @Column(nullable = false, unique = true)
    private String assetNumber;

    @NotEmpty(message = "Asset number is require")
    @Column(nullable = false)
    private String assetName;

    private String description;

    private String status;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Asset asset = (Asset) o;
        return assetId != null && Objects.equals(assetId, asset.assetId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
