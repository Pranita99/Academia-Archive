package com.dockerators.studentapp.Repository;

import com.dockerators.studentapp.dao.StudentRepository;
import com.dockerators.studentapp.entity.Student;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase
public class StudentRepoTest {

    @Autowired
    private StudentRepository studentRepository;

    // Test to save a student
    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveStudentTest(){
        // Creating a student object
        Student student = new Student("1","TestName","email@example.com","123456789");
        studentRepository.save(student);
        // Verifying if the student object has been assigned an ID
        Assertions.assertSame("1", student.getRollNo());
    }

    // Test to get student by roll number
    @Test
    @Order(2)
    @AutoConfigureTestDatabase
    public void getStudentByRollNoTest(){
        // Retrieving a student with roll number 1
        Student search_student = studentRepository.findByRollNo("1").get();
        // Verifying if the retrieved student has the expected roll number
        Assertions.assertEquals("1", search_student.getRollNo());
    }

    @Test
    @Order(3)
    @AutoConfigureTestDatabase
    public void getNonPresentStudentTest(){
        // Checking if a student with Roll number 2 is present
        boolean isPresent = studentRepository.findByRollNo("2").isPresent();
        // Verifying that the student with roll number 2 is not present
        Assertions.assertFalse(isPresent);
    }

    // Test to retrieve a list of students
    @Test
    @Order(4)
    @AutoConfigureTestDatabase
    public void getListOfStudentsTest(){
        // Retrieving all students
        List<Student> students = studentRepository.findAll();
        // Verifying if the list of students is not empty
        Assertions.assertTrue(students.size() > 0);
    }

    // Test to update a student
    @Test
    @Order(5)
    @Rollback(value = false)
    @AutoConfigureTestDatabase
    public void updateStudentTest(){
        // Retrieving a student with roll number 1
        Student student = studentRepository.findByRollNo("1").get();
        // Updating the student's email
        student.setEmail("ram@gmail.com");
        studentRepository.save(student);
        // Verifying if the student's email has been updated
        Assertions.assertEquals("ram@gmail.com", studentRepository.findByRollNo("1").get().getEmail());
    }

    // Test to delete a student by roll number
    @Test
    @Order(6)
    @AutoConfigureTestDatabase
    public void deleteStudentByRollNoTest(){
        // Retrieving a student with Roll No 1
        Student student = studentRepository.findByRollNo("1").get();
        // Deleting the student
        studentRepository.deleteByRollNo(student.getRollNo());
        // Verifying if the student has been deleted
        Student deletedStudent = null;
        Optional<Student> optionalStudent = studentRepository.findByEmail("ram@gmail.com");
        if(optionalStudent.isPresent()){
            deletedStudent = optionalStudent.get();
        }
        Assertions.assertNull(deletedStudent);
    }
}
