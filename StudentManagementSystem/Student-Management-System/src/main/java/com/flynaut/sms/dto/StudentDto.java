package com.flynaut.sms.dto;

import lombok.Data;
import java.util.Date;

@Data
public class StudentDto {

    private Long id;
    private String name;
    private String email;
    private String password;
    private String  contactNumber;
    private String fatherName;
    private String motherName;
    private String studentClass;
    private Date dob;
    private String address;
    private String gender;

}
