package com.flynaut.sms.service.student;

import com.flynaut.sms.dto.SingleStudentDto;
import com.flynaut.sms.dto.StudentDto;
import com.flynaut.sms.dto.StudentLeaveDto;

import java.util.List;

public interface StudentService {
    SingleStudentDto getStudentById(Long studentId);

    StudentLeaveDto applyLeave(StudentLeaveDto studentLeaveDto);

    List<StudentLeaveDto> getAllAppliedLeavesByStudentId(Long studentId);

    StudentDto updateStudent(Long studentId, StudentDto studentDto);
}
