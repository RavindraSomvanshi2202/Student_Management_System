package com.flynaut.sms.controller;

import com.flynaut.sms.dto.TeacherDto;
import com.flynaut.sms.service.home.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    @GetMapping("/teachers")
    public ResponseEntity<List<TeacherDto>> getAllTeachers(){
        List<TeacherDto> allTeachers = homeService.getAllTeachers();
        return ResponseEntity.ok(allTeachers);
    }

}
