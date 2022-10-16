package com.tirwanda.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.util.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Downtime extends BaseEntity<String> implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long downtimeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    @JsonIgnore
    private Asset asset;

    private String assetNumber;

    @NotEmpty(message = "Asset name is required")
    @Column(nullable = false)
    private String assetName;

    @NotEmpty(message = "Work Order is require")
    @Column(nullable = false)
    private String workOrder;

    @NotEmpty(message = "Status is require")
    @Column(nullable = false)
    private String status;

    private String department;
    private String costCenter;
    private String WOType;
    private String sectionCode;
    private String requestBy;

    @NotEmpty(message = "Line is require")
    @Column(nullable = false)
    private String lineName;

    @NotNull(message = "Start Date is require")
    @Column(nullable = false)
    private Long startedDate;

    @NotNull(message = "Completed Date is require")
    @Column(nullable = false)
    private Long completedDate;

    @NotNull(message = "Downtime Hours is require")
    @Column(nullable = false, precision = 10, scale = 2)
    private Double downtimeHours;

    @NotNull(message = "Downtime Minute is require")
    @Column(nullable = false)
    private Integer downtimeMinute;

    @NotEmpty(message = "Approval is required")
    @Column(nullable = false)
    private String approval;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<ReplacedParts> replacedParts = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<ItemCheck> itemChecks = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Apd> apdList = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Downtime downtime = (Downtime) o;
        return downtimeId != null && Objects.equals(downtimeId, downtime.downtimeId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
