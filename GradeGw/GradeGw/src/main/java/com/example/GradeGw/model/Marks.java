package com.example.GradeGw.model;
import com.example.GradeGw.dto.MarkEntry;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "Marks") // Specify the MongoDB collection name
public class Marks {
    @Id
    private String id; // Optional: Use if you want an auto-generated ID
    
    private String registerNumber; // Student's register number // Username of the student
    private List<Submark> submarks; // List of subject marks

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRegisterNumber() {
        return registerNumber;
    }

    public void setRegisterNumber(String registerNumber) {
        this.registerNumber = registerNumber;
    }



    public List<Submark> getSubmarks() {
        return submarks;
    }

    public void setSubmarks(List<Submark> submarks) {
        this.submarks = submarks;
    }
}


