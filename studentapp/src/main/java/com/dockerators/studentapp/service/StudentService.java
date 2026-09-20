package com.dockerators.studentapp.service;

import com.dockerators.studentapp.entity.Student;

import java.util.List;

// An interface for the implementation of the student service
public interface StudentService {
    public List<Student> findAll();
    public Student findByRollNo(String rollNo);
    public Student save(Student student);
    public Student deleteByRollNo(String rollNo);
    public Student updateStudent(Student student);
}
