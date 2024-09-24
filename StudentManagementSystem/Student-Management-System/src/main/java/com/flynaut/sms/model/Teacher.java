package com.flynaut.sms.model;

import com.flynaut.sms.dto.TeacherDto;
import com.flynaut.sms.enums.UserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public TeacherDto getTeacherDto(){
        TeacherDto teacherDto = new TeacherDto();
        teacherDto.setId(id);
        teacherDto.setName(name);
        teacherDto.setEmail(email);
        teacherDto.setContactNumber(contactNumber);
        teacherDto.setQualification(qualification);
        teacherDto.setDepartment(department);
        teacherDto.setDob(dob);
        teacherDto.setAddress(address);
        teacherDto.setGender(gender);
        return teacherDto;
    }

}
