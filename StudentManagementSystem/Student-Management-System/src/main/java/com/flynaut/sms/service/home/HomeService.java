package com.flynaut.sms.service.home;

import com.flynaut.sms.dto.TeacherDto;
import com.flynaut.sms.model.Teacher;
import com.flynaut.sms.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeService {

    private final TeacherRepository teacherRepository;

    public List<TeacherDto> getAllTeachers(){
        return teacherRepository.findAll().stream().map(Teacher::getTeacherDto).collect(Collectors.toList());
    }
}
