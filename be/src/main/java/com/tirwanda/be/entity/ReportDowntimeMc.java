package com.tirwanda.be.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class ReportDowntimeMc extends BaseEntity<String> implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long reportMcId;

    private String date;

    private String lineName;

    private String assetName;

    private String assetNumber;

    private Integer frequency;

    private Integer downtimeMinute;

    @Column(precision = 10, scale = 2)
    private Double mttrValue;

    @Column(precision = 10, scale = 2)
    private Double mtbfValue;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ReportDowntimeMc that = (ReportDowntimeMc) o;
        return reportMcId != null && Objects.equals(reportMcId, that.reportMcId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
