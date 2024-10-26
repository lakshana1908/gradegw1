package com.example.GradeGw.controller;

import com.example.GradeGw.model.StudLoginReq;
import com.example.GradeGw.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/authenticate")
    public ResponseEntity<String> authenticate(@RequestBody StudLoginReq StudLoginReq) {
        boolean isAuthenticated = studentService.authenticate(StudLoginReq.getRegisterNumber(), StudLoginReq.getPassword());
        if (isAuthenticated) {
            return ResponseEntity.ok("Authentication successful");
        } else {
            return ResponseEntity.status(401).body("Invalid register number or password");
        }
    }
}
