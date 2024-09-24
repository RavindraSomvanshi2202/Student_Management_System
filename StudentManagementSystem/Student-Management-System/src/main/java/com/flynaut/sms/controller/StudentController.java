package com.flynaut.sms.controller;

import com.flynaut.sms.dto.SingleStudentDto;
import com.flynaut.sms.dto.StudentDto;
import com.flynaut.sms.dto.StudentLeaveDto;
import com.flynaut.sms.service.student.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/{studentId}")
    public ResponseEntity<SingleStudentDto> getStudentById(@PathVariable Long studentId){
        SingleStudentDto singleStudentDto = studentService.getStudentById(studentId);
        if (singleStudentDto == null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(singleStudentDto);
    }

    @PostMapping("/leave")
    public ResponseEntity<?> applyLeave(@RequestBody StudentLeaveDto studentLeaveDto){
        StudentLeaveDto submittedStudentLeaveDto = studentService.applyLeave(studentLeaveDto);
        if (submittedStudentLeaveDto == null)
            return new ResponseEntity<>("Something Went Wrong", HttpStatus.BAD_REQUEST);
        return ResponseEntity.status(HttpStatus.CREATED).body(submittedStudentLeaveDto);
    }

    @GetMapping("/leave/{studentId}")
    public ResponseEntity<List<StudentLeaveDto>> getAllAppliedLeavesByStudentId(@PathVariable Long studentId){
        List<StudentLeaveDto> studentLeaveDtos = studentService.getAllAppliedLeavesByStudentId(studentId);
        if (studentLeaveDtos == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(studentLeaveDtos);
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<?> updateStudent(@PathVariable Long studentId, @RequestBody StudentDto studentDto) {
        StudentDto updatedStudentDto = studentService.updateStudent(studentId, studentDto);
        if (updatedStudentDto == null) {
            return new ResponseEntity<>("Student not found", HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(updatedStudentDto);
    }

}
