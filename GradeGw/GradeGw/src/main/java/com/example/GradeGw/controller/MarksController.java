package com.example.GradeGw.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import com.example.GradeGw.model.Marks;
import com.example.GradeGw.model.Submark;
import com.example.GradeGw.dto.MarksUploadRequest;
import com.example.GradeGw.dto.MarkEntry;
import com.example.GradeGw.service.MarksService;
import com.example.GradeGw.repository.MarksRepository; // Adjust the package path as necessary



import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin(origins = "http://localhost:3000")
public class MarksController {

    @Autowired
    private MarksService marksService;// Inject MarksService to save data to MongoDB
    
    @Autowired
    private MarksRepository marksRepository;
    
    @Autowired
    public MarksController(MarksService marksService) {
        this.marksService = marksService;
        this.marksRepository = marksRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadMarks(@RequestBody MarksUploadRequest request) {
        try {
            List<MarkEntry> markEntries = request.getData(); // Get the list of mark entries

            // Iterate over the mark entries and save them
            for (MarkEntry entry : markEntries) {
                Marks marks = new Marks();
                marks.setRegisterNumber(entry.getRegisterNumber());// Get username from the request
                 // Get subject code from the request
                Submark submark = new Submark();
                List<Submark> submarks = new ArrayList<>();
                submark.setSubjectCode(request.getSubjectCode());
                submark.setMark(entry.getTotalMark());
                
                // Save each entry
                submarks.add(submark);
                marks.setSubmarks(submarks);
                marksService.insertMarks(marks);
            }

            return ResponseEntity.ok("Marks uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/{registerNumber}/submarks")
    public ResponseEntity<List<Submark>> getSubmarksByRegisterNumber(@PathVariable String registerNumber) {
        List<Submark> submarks = marksService.getSubmarksByRegisterNumber(registerNumber);
        
        if (submarks.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(submarks);
    }
    
    @PutMapping("/update-submarks")
    public ResponseEntity<Void> updateSubmarks(@RequestBody MarksUploadRequest marksUploadRequest) {
        marksService.updateSubmarks(marksUploadRequest);
        return ResponseEntity.ok().build();
    }

}
