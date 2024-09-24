package com.flynaut.sms.service.admin;

import com.flynaut.sms.dto.*;
import com.flynaut.sms.enums.StudentLeaveStatus;
import com.flynaut.sms.enums.UserRole;
import com.flynaut.sms.model.*;
import com.flynaut.sms.repository.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final UserRepository userRepository;
    private final FeeRepository feeRepository;
    private final StudentLeaveRepository studentLeaveRepository;
    private final TeacherRepository teacherRepository;

    @PostConstruct
    public void createAdminAccount(){
        User adminAccount = userRepository.findByRole(UserRole.ADMIN);
        if (adminAccount == null) {
            User admin = new User();
            admin.setEmail("admin@test.com");
            admin.setName("admin");
            admin.setRole(UserRole.ADMIN);
            admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(admin);
        }
    }

    @Override
    public StudentDto postStudent(StudentDto studentDto) {
        Optional<User> optionalUser = userRepository.findFirstByEmail(studentDto.getEmail());
        if (optionalUser.isEmpty()) {
            User user = new User();
            BeanUtils.copyProperties(studentDto, user, "password");
            user.setPassword(new BCryptPasswordEncoder().encode(studentDto.getPassword()));
            user.setRole(UserRole.STUDENT);
            User createdUser = userRepository.save(user);
            StudentDto createdStudentDto = new StudentDto();
            createdStudentDto.setId(createdUser.getId());
            createdStudentDto.setEmail(createdUser.getEmail());
            return createdStudentDto;
        }
        return null;
    }

    @Override
    public List<StudentDto> getAllStudents() {
        return userRepository.findAllByRole(UserRole.STUDENT).stream().map(User::getStudentDto).collect(Collectors.toList());
    }

    @Override
    public void deleteStudent(Long studentId) {
        userRepository.deleteById(studentId);
    }

    @Override
    public SingleStudentDto getStudentById(Long studentId) {
        Optional<User> optionalUser = userRepository.findById(studentId);
        SingleStudentDto singleStudentDto = new SingleStudentDto();
        optionalUser.ifPresent(user -> singleStudentDto.setStudentDto(user.getStudentDto()));
        return singleStudentDto;
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

    @Override
    public FeeDto payFee(Long studentId, FeeDto feeDto) {
        Optional<User> optionalStudent = userRepository.findById(studentId);
        if (optionalStudent.isPresent()){
            Fee fee = new Fee();
            fee.setAmount(feeDto.getAmount());
            fee.setMonth(feeDto.getMonth());
            fee.setDescription(feeDto.getDescription());
            fee.setCreatedDate(new Date());
            fee.setGivenBy(feeDto.getGivenBy());
            fee.setUser(optionalStudent.get());
            Fee paidFee = feeRepository.save(fee);
            FeeDto paidFeeDto = new FeeDto();
            paidFeeDto.setId(paidFee.getId());
            return paidFeeDto;
        }
        return null;
    }

    @Override
    public List<StudentLeaveDto> getAllAppliedLeaves() {
        return studentLeaveRepository.findAll().stream().map(StudentLeave::getStudentLeaveDto).collect(Collectors.toList());
    }

    @Override
    public StudentLeaveDto changeLeaveStatus(Long leaveId, String status) {
        Optional<StudentLeave> optionalStudentLeave = studentLeaveRepository.findById(leaveId);
        if (optionalStudentLeave.isPresent()){
            StudentLeave studentLeave = optionalStudentLeave.get();
            if (Objects.equals(status, "Approve")){
                studentLeave.setStudentLeaveStatus(StudentLeaveStatus.Approved);
            } else {
                studentLeave.setStudentLeaveStatus(StudentLeaveStatus.Rejected);
            }
            StudentLeave updatedStudentLeave = studentLeaveRepository.save(studentLeave);
            StudentLeaveDto updatedStudentLeaveDto = new StudentLeaveDto();
            updatedStudentLeaveDto.setId(updatedStudentLeave.getId());
            return updatedStudentLeaveDto;
        }
        return null;
    }

    @Override
    public TeacherDto postTeacher(TeacherDto teacherDto) {
        Teacher teacher = new Teacher();
        BeanUtils.copyProperties(teacherDto, teacher, "password");
        Teacher createdTeacher = teacherRepository.save(teacher);
        TeacherDto createdTeacherDto = new TeacherDto();
        createdTeacherDto.setId(createdTeacher.getId());
        return createdTeacherDto;
    }

    @Override
    public List<TeacherDto> getAllTeachers() {
        return teacherRepository.findAll().stream().map(Teacher::getTeacherDto).collect(Collectors.toList());
    }

    @Override
    public void deleteTeacher(Long teacherId) {
        teacherRepository.deleteById(teacherId);
    }

    @Override
    public SingleTeacherDto getTeacherById(Long teacherId) {
        Optional<Teacher> optionalTeacher = teacherRepository.findById(teacherId);
        if (optionalTeacher.isPresent()){
            SingleTeacherDto singleTeacherDto = new SingleTeacherDto();
            singleTeacherDto.setTeacherDto(optionalTeacher.get().getTeacherDto());
            return singleTeacherDto;
        }
        return null;
    }

    @Override
    public TeacherDto updateTeacher(Long teacherId, TeacherDto teacherDto) {
        Optional<Teacher> optionalTeacher = teacherRepository.findById(teacherId);
        if (optionalTeacher.isPresent()){
            Teacher updateTeacher = optionalTeacher.get();
            updateTeacher.setName(teacherDto.getName());
            updateTeacher.setDob(teacherDto.getDob());
            updateTeacher.setDepartment(teacherDto.getDepartment());
            updateTeacher.setAddress(teacherDto.getAddress());
            updateTeacher.setGender(teacherDto.getGender());
            updateTeacher.setQualification(teacherDto.getQualification());
            updateTeacher.setContactNumber(teacherDto.getContactNumber());
            updateTeacher.setEmail(teacherDto.getEmail());
            Teacher updatedTeacher = teacherRepository.save(updateTeacher);
            TeacherDto updatedTeacherDto = new TeacherDto();
            updatedTeacherDto.setId(updatedTeacher.getId());
            return updatedTeacherDto;
        }
        return null;
    }
}


