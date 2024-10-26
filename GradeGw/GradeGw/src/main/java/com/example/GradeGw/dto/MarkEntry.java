package com.example.GradeGw.dto;


public class MarkEntry {
    private String registerNumber; // Student's register number
    private int totalMark; // Total marks obtained by the student

    // Getters and Setters
    public String getRegisterNumber() {
        return registerNumber;
    }

    public void setRegisterNumber(String registerNumber) {
        this.registerNumber = registerNumber;
    }

    public int getTotalMark() {
        return totalMark;
    }

    public void setTotalMark(int totalMark) {
        this.totalMark = totalMark;
    }
}

