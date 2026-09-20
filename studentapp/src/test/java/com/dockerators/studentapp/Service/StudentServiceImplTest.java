package com.dockerators.studentapp.Service;

import com.dockerators.studentapp.dao.StudentRepository;
import com.dockerators.studentapp.entity.Student;
import com.dockerators.studentapp.exception.StudentAlreadyExistsException;
import com.dockerators.studentapp.exception.StudentNotFoundException;
import com.dockerators.studentapp.service.StudentService;
import com.dockerators.studentapp.service.StudentServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class StudentServiceImplTest {
    
    @Mock
    private StudentRepository studentRepository;
    
    private StudentService studentService;

    @BeforeEach
    public void setup() {
        studentService = new StudentServiceImpl(studentRepository);
    }

    @Test
    public void testFindAll() {
        // Arrange
        List<Student> studentList = new ArrayList<>();
        studentList.add(new Student("1", "Student 1","student1@email.com", "123456789"));
        studentList.add(new Student("2", "Student 2","student2@email.com", "987654321"));

        // Mocking the student repository to return the above two students for the findAll() repository function
        Mockito.when(studentRepository.findAll()).thenReturn(studentList);

        // Calling the findAll() service function
        List<Student> result = studentService.findAll();

        // Asserting that the correct students were returned
        Assertions.assertEquals(2, result.size());
        Assertions.assertEquals("1", result.get(0).getRollNo());
        Assertions.assertEquals("Student 1", result.get(0).getName());
        Assertions.assertEquals("2", result.get(1).getRollNo());
        Assertions.assertEquals("Student 2", result.get(1).getName());

        // Verifying that the repository findAll() function was called 1 time
        Mockito.verify(studentRepository, Mockito.times(1)).findAll();
    }

    @Test
    public void testFindByRollNo_StudentRollNoFound() {
        // Arrange
        String rollNo = "1";
        Student student = new Student("1", "Student 1","student1@email.com", "123456789");

        // Mocking the student repository to return the above student for the findByRollNo() function for the rollNo 1
        Mockito.when(studentRepository.findByRollNo(rollNo)).thenReturn(Optional.of(student));

        // Calling the findByRollNo service function
        Student result = studentService.findByRollNo(rollNo);

        // Asserting that the correct student was returned
        Assertions.assertEquals(rollNo, result.getRollNo());
        Assertions.assertEquals("Student 1", result.getName());

        // Verifying that the findByRollNo repo function was called 1 time in the service function
        Mockito.verify(studentRepository, Mockito.times(1)).findByRollNo(rollNo);
    }

    @Test
    public void testFindByRollNo_StudentRollNoNotFound() {
        // Arrange
        String rollNo = "1";

        // Mocking the student repository to return nothing for the findByRollNo() function for the rollNo 1
        Mockito.when(studentRepository.findByRollNo(rollNo)).thenReturn(Optional.empty());

        // Assertions and checking if StudentNotFoundException is thrown after calling the findByRollNo service function
        Assertions.assertThrows(StudentNotFoundException.class, () -> {
            studentService.findByRollNo(rollNo);
        });

        // Verifying that the findByRollNo repo function was called 1 time in the service function
        Mockito.verify(studentRepository, Mockito.times(1)).findByRollNo(rollNo);
    }

    @Test
    public void testUpdateStudent_StudentRollNoFound() {
        // Arrange
        String rollNo = "1";
        Student student = new Student("1", "Student 1","student1@email.com", "123456789");

        // Mocking the student repository to return the above student for the findByRollNo() function for the rollNo 1
        Mockito.when(studentRepository.findByRollNo(rollNo)).thenReturn(Optional.of(student));
        // Mocking the student repository to return the above student for the save() function for the rollNo 1
        Mockito.when(studentRepository.save(student)).thenReturn(student);

        // Calling the updateStudent service function
        Student result = studentService.updateStudent(student);

        // Asserting that the correct student was returned
        Assertions.assertEquals(rollNo, result.getRollNo());
        Assertions.assertEquals("Student 1", result.getName());

        // Verifying that the save repo function was called 1 time in the service function
        Mockito.verify(studentRepository, Mockito.times(1)).save(student);
    }

    @Test
    public void testUpdateStudent_StudentRollNoNotFound() {
        // Arrange
        String rollNo = "1";
        Student student = new Student("1", "Student 1","student1@email.com", "123456789");

        // Mocking the student repository to return nothing for the findByRollNo() function for the rollNo 1
        Mockito.when(studentRepository.findByRollNo(rollNo)).thenReturn(Optional.empty());

        // Asserting that the StudentNotFoundException is thrown when the update service function is called
        Assertions.assertThrows(StudentNotFoundException.class, () -> {
            studentService.updateStudent(student);
        });

        // Verifying that the save repo function was called 0 times in the service function as a student with that rollNo does not exist
        Mockito.verify(studentRepository, Mockito.never()).save(student);
    }

    @Test
    public void saveStudentSuccess_RollNoNotFound() {
        // Arrange
        String rollNo = "1";
        Student student = new Student("1", "Student 1","student1@email.com", "123456789");

        // Mocking the student repository to return nothing for the findByRollNo() function for the rollNo 1
        Mockito.when(studentRepository.findByRollNo(rollNo)).thenReturn(Optional.empty());
        // Mocking the student repository to return the above student for the save() function for the rollNo 1
        Mockito.when(studentRepository.save(student)).thenReturn(student);

        // Calling the service save function
        Student result = studentService.save(student);

        // Asserting that the correct student is returned after saving
        Assertions.assertEquals(rollNo, result.getRollNo());
        Assertions.assertEquals("Student 1", result.getName());

        // Verifying that the save repo function was called once as it was a success
        Mockito.verify(studentRepository, Mockito.times(1)).save(student);
    }

    @Test
    public void saveStudentFailure_RollNoFound() {
        // Arrange
        String rollNo = "1";
        Student student = new Student("1", "Student 1","student1@email.com", "123456789");

        // Mocking the student repository to return the above student for the findByRollNo() function for the rollNo 1
        Mockito.when(studentRepository.findByRollNo(rollNo)).thenReturn(Optional.of(student));

        // Asserting that the StudentAlreadyExistsException is thrown the service save function
        Assertions.assertThrows(StudentAlreadyExistsException.class, () -> {
            studentService.save(student);
        });

        // Verifying that the save repo function was called 0 times in the service function as a student with that rollNo already exists
        Mockito.verify(studentRepository, Mockito.never()).save(student);
    }

    @Test
    public void deleteStudentSuccess_RollNoFound() {
        // Arrange
        String rollNo = "1";
        Student student = new Student("1", "Student 1","student1@email.com", "123456789");

        // Mocking the student repository to return the above student for the findByRollNo() function for the rollNo 1
        Mockito.when(studentRepository.findByRollNo(rollNo)).thenReturn(Optional.of(student));

        // Calling the service deleteByRollNo function
        Student result = studentService.deleteByRollNo(rollNo);

        // Asserting that the correct student is deleted
        Assertions.assertEquals(rollNo, result.getRollNo());
        Assertions.assertEquals("Student 1", result.getName());

        // Verifying that the findByRollNo and deleteByRollNo repo functions were called 1 time
        Mockito.verify(studentRepository, Mockito.times(1)).findByRollNo(rollNo);
        Mockito.verify(studentRepository, Mockito.times(1)).deleteByRollNo(rollNo);
    }

    @Test
    public void deleteStudentFailure_RollNoNotFound() {
        // Arrange
        String rollNo = "1";

        // Mocking the student repository to return nothing for the findByRollNo() function for the rollNo 1
        Mockito.when(studentRepository.findByRollNo(rollNo)).thenReturn(Optional.empty());

        // Asserting that the StudentNotFoundException is thrown after calling the service deleteByRollNo function
        Assertions.assertThrows(StudentNotFoundException.class, () -> {
            studentService.deleteByRollNo(rollNo);
        });

        // Verifying that the findByRollNo repo function was called once
        Mockito.verify(studentRepository, Mockito.times(1)).findByRollNo(rollNo);
        // Verifying that the deleteByRollNo repo function was not called as a student with that rollNo doesn't exist.
        Mockito.verify(studentRepository, Mockito.never()).deleteByRollNo(rollNo);
    }
}
