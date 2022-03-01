package com.tirwanda.be.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseData<T> {
    private boolean status;
    private List<String> message = new ArrayList<>();
    private T payload;
}
