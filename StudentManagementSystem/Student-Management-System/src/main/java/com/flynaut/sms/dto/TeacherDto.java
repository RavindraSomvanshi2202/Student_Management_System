package com.flynaut.sms.dto;

import lombok.Data;
import java.util.Date;

@Data
public class TeacherDto {

    private Long id;
    private String name;
    private String email;
    private String password;
    private String contactNumber;
    private String qualification;
    private String department;
    private Date dob;
    private String address;
    private String gender;

}
