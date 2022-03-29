package com.tirwanda.be.entity;

import lombok.*;
import org.hibernate.Hibernate;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

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
public class Line extends BaseEntity<String> implements Serializable {

    @Serial
    private final static long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long lineId;

    @NotEmpty(message = "Line code is required")
    @Column(nullable = false, unique = true)
    private String lineCode;

    @NotEmpty(message = "Line name is required")
    private String lineName;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer cycleTime;

    @OneToMany(targetEntity = Asset.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "line_id", referencedColumnName = "lineId")
    @LazyCollection(LazyCollectionOption.FALSE)
    @ToString.Exclude
    List<Asset> assets = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Line line = (Line) o;
        return lineId != null && Objects.equals(lineId, line.lineId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
