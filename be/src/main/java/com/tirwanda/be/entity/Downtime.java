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

    @NotNull(message = "Start Date is require")
    @Column(nullable = false)
    private Long startedDate;

    @NotNull(message = "Completed Date is require")
    @Column(nullable = false)
    private Long completedDate;

    @NotNull(message = "Downtime Hours is require")
    @Column(nullable = false)
    private Double downtimeHours;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<ReplacedParts> replacedParts = new HashSet<>();

/*
    @ElementCollection
    private List<String> itemCheck;
*/

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Apd> apdList = new ArrayList<>();

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
