package com.tirwanda.be.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Part extends BaseEntity<String> implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long partId;

    @NotEmpty(message = "Part number is required")
    @Column(nullable = false, unique = true)
    private String partNumber;

    @NotEmpty(message = "Part name is required")
    private String partName;

    @NotEmpty(message = "UOM is required")
    private String UOM;
    private Integer stock;

    @ManyToMany(mappedBy = "partList")
    @JsonIgnore
    private List<Asset> assetList = new ArrayList<>();
}
