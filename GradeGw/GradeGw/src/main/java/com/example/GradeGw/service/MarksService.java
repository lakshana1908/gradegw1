package com.example.GradeGw.service;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query; // Ensure this import is present
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.example.GradeGw.model.Marks;
import com.example.GradeGw.model.Submark;
import com.example.GradeGw.dto.MarkEntry;
import com.example.GradeGw.dto.MarksUploadRequest;
import org.springframework.stereotype.Service;
import com.example.GradeGw.repository.MarksRepository;

import java.util.List;
import java.util.Collections;
@Service
public class MarksService {
    
    @Autowired
    private MongoTemplate mongoTemplate;
	
	 @Autowired
     private MarksRepository marksRepository;

    public Marks insertMarks(Marks marks) {
        try {
        	marksRepository.insert(marks); // No need to specify collection name, it's inferred from @Document annotation
            
            return marks;
        } catch (Exception e) {
            // Handle any errors
            System.out.println("Error occurred while saving marks: " + e.getMessage());
            return null;
            
        }
    }
  
    public List<Submark> getSubmarksByRegisterNumber(String registerNumber) {
        Marks marks = marksRepository.findByRegisterNumber(registerNumber);
        if (marks != null) {
            return marks.getSubmarks();
        }
        return Collections.emptyList(); // Return an empty list if not found
    }
    
    public void updateSubmarks(MarksUploadRequest marksUploadRequest) {
        List<MarkEntry> entries = marksUploadRequest.getData();
        String newSubjectCode = marksUploadRequest.getSubjectCode();

        for (MarkEntry entry : entries) {
            // Fetch the Marks document using the registerNumber
            Marks existingMarks = marksRepository.findByRegisterNumber(entry.getRegisterNumber());
            if (existingMarks != null) {
                // Create a new Submark for the new subject
                Submark newSubmark = new Submark();
                newSubmark.setSubjectCode(newSubjectCode);
                newSubmark.setMark(entry.getTotalMark()); // Set the total mark

                // Add the new Submark to the existing Marks document
                existingMarks.getSubmarks().add(newSubmark);

                // Save the updated Marks document back to the database
                marksRepository.save(existingMarks);
            } else {
                // Handle case where Marks document does not exist, if needed
                System.out.println("No Marks found for register number: " + entry.getRegisterNumber());
            }
        }
    }
    }

