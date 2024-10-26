package com.example.GradeGw.model;

public class Submark {
    private String subjectCode; // Subject code
    private int mark; // Marks for the subject

    // Constructor
    public Submark(String subjectCode, int mark) {
        this.subjectCode = subjectCode;
        this.mark = mark;
    }
    
    public Submark() {}

    // Getters and Setters
    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public int getMark() {
        return mark;
    }

    public void setMark(int mark) {
        this.mark = mark;
    }
}
