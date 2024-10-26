package com.example.GradeGw.repository;

import com.example.GradeGw.model.Marks;

import com.example.GradeGw.dto.MarkEntry;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarksRepository extends MongoRepository<Marks, String> {
    // You can define custom queries here if needed, though it's not mandatory in your case.
	Marks findByRegisterNumber(String registerNumber);
}
