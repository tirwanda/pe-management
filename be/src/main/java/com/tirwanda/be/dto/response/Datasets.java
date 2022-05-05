package com.tirwanda.be.dto.response;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Datasets {
    private String label;
    private List<String> backgroundColors = new ArrayList<>();
    private List<Integer> data = new ArrayList<>();
}
