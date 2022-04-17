package com.tirwanda.be.entity;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
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

    private String status;

    private String assetLocation;

    private String assetFunction;

    private String process;

    private String output;

    private Integer lastPoPrice;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(FetchMode.SELECT)
    @JoinTable(
            name = "asset_part_map",
            joinColumns = @JoinColumn(name = "asset_id"),
            inverseJoinColumns =@JoinColumn(name = "part_id")
    )
    private List<Part> partList = new ArrayList<>();

    public void addPart(Part part) {
        this.partList.add(part);
        part.getAssetList().add(this);
    }

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
