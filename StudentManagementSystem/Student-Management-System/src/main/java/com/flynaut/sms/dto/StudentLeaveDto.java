package com.flynaut.sms.dto;

import com.flynaut.sms.enums.StudentLeaveStatus;
import lombok.Data;

import java.util.Date;

@Data
public class StudentLeaveDto {

    private Long id;

    private String name;

    private String studentClass;

    private String subject;

    private String body;

    private Date date;

    private StudentLeaveStatus studentLeaveStatus;

    private Long userId;
}
