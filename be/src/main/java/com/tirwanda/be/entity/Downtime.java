package com.tirwanda.be.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serial;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Objects;

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

    @NotEmpty(message = "Start Date is require")
    @Column(nullable = false)
    private Date startedDate;

    @NotEmpty(message = "Start Time is require")
    @Column(nullable = false)
    private Time startedTime;

    @NotEmpty(message = "Completed Date is require")
    @Column(nullable = false)
    private Date completedDate;

    @NotEmpty(message = "Completed Time is require")
    @Column(nullable = false)
    private Time completedTime;

    @NotEmpty(message = "Downtime Hours is require")
    @Column(nullable = false)
    private Long downtimeHours;

    @ElementCollection
    private List<String> replacedParts;

    @ElementCollection
    private List<String> itemCheck;

    @ElementCollection
    private List<String> APD;

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
