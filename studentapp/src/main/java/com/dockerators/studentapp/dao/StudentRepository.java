package com.dockerators.studentapp.dao;

import com.dockerators.studentapp.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository <Student, Integer> {
    // JPA Repository Function to find all students by the property 'email'
    Optional<Student> findByEmail(String email);
    Optional<Student> findByRollNo(String rollNo);
    void deleteByRollNo(String rollNo);
}
