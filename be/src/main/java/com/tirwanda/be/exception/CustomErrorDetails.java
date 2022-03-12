package com.tirwanda.be.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class CustomErrorDetails {
    private Date timeStamp;
    private String message;
    private String errorDetails;
}
