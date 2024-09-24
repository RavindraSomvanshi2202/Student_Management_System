package com.flynaut.sms.dto;

import lombok.Data;

import java.util.Date;

@Data
public class FeeDto {

    private Long id;

    private String month;

    private String givenBy;

    private Long amount;

    private String description;

    private Date createdDate;

    private Long studentId;
}
