package com.flynaut.sms.service.student;

import com.flynaut.sms.dto.SingleStudentDto;
import com.flynaut.sms.dto.StudentDto;
import com.flynaut.sms.dto.StudentLeaveDto;
import com.flynaut.sms.enums.StudentLeaveStatus;
import com.flynaut.sms.model.StudentLeave;
import com.flynaut.sms.model.User;
import com.flynaut.sms.repository.StudentLeaveRepository;
import com.flynaut.sms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final UserRepository userRepository;

    private final StudentLeaveRepository studentLeaveRepository;

    @Override
    public SingleStudentDto getStudentById(Long studentId) {
        Optional<User> optionalUser = userRepository.findById(studentId);
        SingleStudentDto singleStudentDto = new SingleStudentDto();
        optionalUser.ifPresent(user -> singleStudentDto.setStudentDto(user.getStudentDto()));
        return singleStudentDto;
    }

    @Override
    public StudentLeaveDto applyLeave(StudentLeaveDto studentLeaveDto) {
        Optional<User> optionalUser = userRepository.findById(studentLeaveDto.getUserId());
        if (optionalUser.isPresent()) {
            StudentLeave studentLeave = new StudentLeave();
            studentLeave.setSubject(studentLeaveDto.getSubject());
            studentLeave.setName(studentLeaveDto.getName());
            studentLeave.setStudentClass(studentLeaveDto.getStudentClass());
            studentLeave.setBody(studentLeaveDto.getBody());
            studentLeave.setDate(studentLeaveDto.getDate());
            studentLeave.setStudentLeaveStatus(StudentLeaveStatus.Pending);
            studentLeave.setUser(optionalUser.get());
            StudentLeave submittedStudentLeave = studentLeaveRepository.save(studentLeave);
            StudentLeaveDto studentLeaveDto1 = new StudentLeaveDto();
            studentLeaveDto1.setId(submittedStudentLeave.getId());
//            studentLeaveDto1.setName(submittedStudentLeave.getName());
            studentLeaveDto1.setStudentClass(submittedStudentLeave.getStudentClass());
            return studentLeaveDto1;
        }
        return null;
    }

    @Override
    public List<StudentLeaveDto> getAllAppliedLeavesByStudentId(Long studentId) {
        return studentLeaveRepository.findAllByUserId(studentId).stream().map(StudentLeave::getStudentLeaveDto).collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long studentId, StudentDto studentDto) {
        Optional<User> optionalUser = userRepository.findById(studentId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(studentDto.getName());
            user.setGender(studentDto.getGender());
            user.setContactNumber(studentDto.getContactNumber());
            user.setAddress(studentDto.getAddress());
            user.setDob(studentDto.getDob());
            user.setStudentClass(studentDto.getStudentClass());
            user.setFatherName(studentDto.getFatherName());
            user.setMotherName(studentDto.getMotherName());
            user.setEmail(studentDto.getEmail());
            User updatedStudent = userRepository.save(user);
            StudentDto updatedStudentDto = new StudentDto();
            updatedStudentDto.setId(updatedStudent.getId());
            return updatedStudentDto;
        }
//            User user = optionalUser.get();
//            Long existingId = user.getId();
//            BeanUtils.copyProperties(studentDto, user, "id");
//            user.setId(existingId);
//            User updatedStudent = userRepository.save(user);
//            StudentDto updatedStudentDto = new StudentDto();
//            BeanUtils.copyProperties(updatedStudent, updatedStudentDto);
//            return updatedStudentDto;
//        }
        return null;
    }
}
