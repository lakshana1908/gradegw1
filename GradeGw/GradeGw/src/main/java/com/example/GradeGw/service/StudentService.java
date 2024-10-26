// StudentService.java
package com.example.GradeGw.service;

import org.springframework.stereotype.Service;

@Service
public class StudentService {

    // This should be replaced with actual user service/repository in a real application
    public boolean authenticate(String registerNumber, String password) {
        // Mock user for demonstration
        String mockRegisterNumber = "12585"; // Example register number
        String mockPassword = "abc";  // Example password

        // Replace this with actual authentication logic (e.g., checking a database)
        return mockRegisterNumber.equals(registerNumber) && mockPassword.equals(password);
    }
}
