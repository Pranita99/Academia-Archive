package com.dockerators.studentapp.rest;

import com.dockerators.studentapp.entity.Student;
import com.dockerators.studentapp.service.StudentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StudentRestController {
    // Private Student Service to obtain all functionalities of the service layer
    private StudentService studentService;

    @Autowired
    // Constructor
    public StudentRestController(StudentService studentService){
        this.studentService = studentService;
    }

    @GetMapping("/students")
    // Route to get all students
    public List<Student> findAll() {
        return (this.studentService.findAll());
    }

    @GetMapping("/students/rollNo/{rollNo}")
    // Route to get the student that corresponds to a roll number
    // The roll number is taken as a path variable
    public Student findByRollNo(@PathVariable String rollNo){
        return this.studentService.findByRollNo(rollNo);
    }

    @PostMapping("/students")
    // Route to add a new student
    // The student object is accepted in the request body
    public Student addStudent(@RequestBody Student student) {
        return (this.studentService.save(student));
    }

    @PutMapping("/students")
    // Route to update a student
    // The student object is accepted in the request body
    public Student updateStudent(@RequestBody Student student) {
        return (this.studentService.updateStudent(student));
    }

    @Transactional
    @DeleteMapping("/students/rollNo/{rollNo}")
    // Route to get the student that corresponds to a roll number
    // The roll number is taken as a path variable
    public Student deleteByRollNo(@PathVariable String rollNo){
        return this.studentService.deleteByRollNo(rollNo);
    }
}
