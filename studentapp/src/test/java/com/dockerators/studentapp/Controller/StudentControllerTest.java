package com.dockerators.studentapp.Controller;
import com.dockerators.studentapp.entity.Student;
import com.dockerators.studentapp.rest.StudentRestController;
import com.dockerators.studentapp.service.StudentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import static org.mockito.ArgumentMatchers.any;

import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.isNotNull;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@WebMvcTest(StudentRestController.class)
public class StudentControllerTest {
    // ObjectMapper to convert objects to JSON and vice versa
    ObjectMapper om = new ObjectMapper();
    @MockBean
    private StudentService studentService;

    @InjectMocks
    private StudentRestController studentRestController;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetAllStudents() throws Exception {
        // Mock data
        Student student1 = new Student("1","Paul", "paul@gmail.com","987654321");
        Student student2 = new Student("2","Adams", "adams@gmail.com","123456789");
        List<Student> students = Arrays.asList(student1, student2);

        // Mock the service method call
        when(studentService.findAll()).thenReturn(students);

        // Perform GET request and validate the response
        mockMvc.perform(MockMvcRequestBuilders.get("/api/students")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Paul"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("Adams"));

    }

    @Test
    public void testGetStudentFromRollNo() throws Exception {
        // Mock data
        String rollNo = "1";
        Student student = new Student(rollNo,"Paul", "paul@gmail.com","987654321");

        // Mock the service method call
        when(studentService.findByRollNo(rollNo)).thenReturn(student);

        // Perform GET request and validate the response
        mockMvc.perform(MockMvcRequestBuilders.get("/api/students/rollNo/{rollNo}",rollNo)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Paul"));

    }

    @Test
    public void testAddStudent() throws Exception {
        // Mock data
        Student student = new Student("10", "Paul", "paul@gmail.com", "987654321");

        // Mock the service method call
        when(studentService.save(student)).thenReturn(student);

        // Perform POST request and validate the response
        mockMvc.perform(MockMvcRequestBuilders.post("/api/students")
                        .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(student)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Paul"));
    }


    @Test
    public void testUpdateStudent() throws Exception {
        // Mock data
        Student student = new Student("10", "John", "john@example.com", "123456789");

        // Mock the service method call
        when(studentService.updateStudent(student)).thenReturn(student);

        // Perform PUT request and validate the response
        mockMvc.perform(MockMvcRequestBuilders.put("/api/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(student)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("John"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("john@example.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.phone").value("123456789"));

        // Verify the service method call
        Mockito.verify(studentService).updateStudent(student);
    }

    @Test
    public void testDeleteByRollNoStudent() throws Exception {
        // Mock data
        String rollNo = "1";
        Student student = new Student(rollNo, "John", "john@example.com", "123456789");

        // Mock the service method call
        when(studentService.deleteByRollNo(rollNo)).thenReturn(student);

        // Perform DELETE request and validate the response
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/students/rollNo/{rollNo}", rollNo))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("John"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("john@example.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.phone").value("123456789"));

        // Verify the service method call
        Mockito.verify(studentService).deleteByRollNo(rollNo);
    }

}
