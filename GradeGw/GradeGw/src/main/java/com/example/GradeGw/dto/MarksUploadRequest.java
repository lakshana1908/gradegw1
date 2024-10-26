package com.example.GradeGw.dto;

import java.util.List;
import com.example.GradeGw.model.Submark;

import com.example.GradeGw.dto.MarkEntry;

public class MarksUploadRequest {
    private String subjectCode;
    private List<MarkEntry> data;

    // Getters and Setters
    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }


    public List<MarkEntry> getData() {
        return data;
    }

    public void setData(List<MarkEntry> data) {
        this.data = data;
    }
}

