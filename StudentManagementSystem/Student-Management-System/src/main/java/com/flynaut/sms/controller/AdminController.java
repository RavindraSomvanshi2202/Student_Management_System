package com.flynaut.sms.controller;

import com.flynaut.sms.dto.*;
import com.flynaut.sms.service.admin.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/student")
    public ResponseEntity<?> postStudent(@RequestBody StudentDto studentDto) {
        StudentDto createdStudentDto = adminService.postStudent(studentDto);
        if (createdStudentDto == null)
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudentDto);
    }

    @GetMapping("/students")
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<StudentDto> allStudents = adminService.getAllStudents();
        return ResponseEntity.ok(allStudents);
    }

    @DeleteMapping("/student/{studentId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long studentId) {
        adminService.deleteStudent(studentId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<SingleStudentDto> getStudentById(@PathVariable Long studentId) {
        SingleStudentDto singleStudentDto = adminService.getStudentById(studentId);
        if (singleStudentDto == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(singleStudentDto);
    }

    @PutMapping("/student/{studentId}")
    public ResponseEntity<?> updateStudent(@PathVariable Long studentId, @RequestBody StudentDto studentDto) {
        StudentDto updatedStudentDto = adminService.updateStudent(studentId, studentDto);
        if (updatedStudentDto == null) {
            return new ResponseEntity<>("Something Went Wrong", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.status(HttpStatus.OK).body(updatedStudentDto);
    }

    @PostMapping("/fee/{studentId}")
    public ResponseEntity<?> payFee(@PathVariable Long studentId, @RequestBody FeeDto feeDto) {
        FeeDto paidFeeDto = adminService.payFee(studentId, feeDto);
        if (paidFeeDto == null)
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        return ResponseEntity.status(HttpStatus.CREATED).body(paidFeeDto);
    }

    @GetMapping("/leaves")
    public ResponseEntity<List<StudentLeaveDto>> getAllAppliedLeaves() {
        List<StudentLeaveDto> studentLeaveDtos = adminService.getAllAppliedLeaves();
        if (studentLeaveDtos == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(studentLeaveDtos);
    }

    @GetMapping("/leave/{leaveId}/{status}")
    public ResponseEntity<?> changeLeaveStatus(@PathVariable Long leaveId, @PathVariable String status) {
        StudentLeaveDto studentLeaveDto = adminService.changeLeaveStatus(leaveId, status);
        if (studentLeaveDto == null)
            return new ResponseEntity<>("Something Went Wrong", HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(studentLeaveDto);
    }

    //Teachers operation

    @PostMapping("/teacher")
    public ResponseEntity<?> postTeacher(@RequestBody TeacherDto teacherDto) {
        TeacherDto createdTeacherDto = adminService.postTeacher(teacherDto);
        if (createdTeacherDto == null)
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTeacherDto);
    }

    @GetMapping("/teachers")
    public ResponseEntity<List<TeacherDto>> getAllTeachers() {
        List<TeacherDto> allTeachers = adminService.getAllTeachers();
        return ResponseEntity.ok(allTeachers);
    }

    @DeleteMapping("/teacher/{teacherId}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long teacherId) {
        adminService.deleteTeacher(teacherId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<SingleTeacherDto> getTeacherById(@PathVariable Long teacherId) {
        SingleTeacherDto singleTeacherDto = adminService.getTeacherById(teacherId);
        if (singleTeacherDto == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(singleTeacherDto);
    }

    @PutMapping("/teacher/{teacherId}")
    public ResponseEntity<?> updateTeacher(@PathVariable Long teacherId, @RequestBody TeacherDto teacherDto) {
        TeacherDto updatedTeacherDto = adminService.updateTeacher(teacherId, teacherDto);
        if (updatedTeacherDto == null) {
            return new ResponseEntity<>("Something Went Wrong", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.status(HttpStatus.OK).body(updatedTeacherDto);
    }
}
