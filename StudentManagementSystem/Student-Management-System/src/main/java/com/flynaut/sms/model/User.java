package com.flynaut.sms.model;

import com.flynaut.sms.dto.StudentDto;
import com.flynaut.sms.enums.UserRole;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;
    private String contactNumber;
    private String fatherName;
    private String motherName;
    private String studentClass;
    private Date dob;
    private String address;
    private String gender;
    private UserRole role;

    public StudentDto getStudentDto(){
        StudentDto studentDto = new StudentDto();
        studentDto.setId(id);
        studentDto.setName(name);
        studentDto.setEmail(email);
        studentDto.setContactNumber(contactNumber);
        studentDto.setAddress(address);
        studentDto.setDob(dob);
        studentDto.setStudentClass(studentClass);
        studentDto.setGender(gender);
        studentDto.setFatherName(fatherName);
        studentDto.setMotherName(motherName);
        return studentDto;
    }
}
