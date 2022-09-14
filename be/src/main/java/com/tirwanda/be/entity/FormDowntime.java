package com.tirwanda.be.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class FormDowntime extends BaseEntity<String> implements Serializable {

    @Serial
    private static final long serialVersionUID = 3871925142389590145L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long formDowntimeId;

    @NotEmpty(message = "Asset Number is required")
    private String assetNumber;

    @NotEmpty(message = "Work Order is required")
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
    @Column(nullable = false, precision = 10, scale = 2)
    private Double downtimeHours;

    @NotNull(message = "Downtime Minute is require")
    @Column(nullable = false)
    private Integer downtimeMinute;

    @NotEmpty(message = "Approval is required")
    @Column(nullable = false)
    private String approval;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FormDowntime that = (FormDowntime) o;
        return formDowntimeId != null && Objects.equals(formDowntimeId, that.formDowntimeId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
