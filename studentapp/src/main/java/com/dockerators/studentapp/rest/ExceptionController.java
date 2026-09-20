package com.dockerators.studentapp.rest;

import com.dockerators.studentapp.exception.NullFieldsException;
import com.dockerators.studentapp.exception.StudentAlreadyExistsException;
import com.dockerators.studentapp.exception.StudentNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@CrossOrigin(origins = "*")
public class ExceptionController {

    @ExceptionHandler(value = NullFieldsException.class)
    public ResponseEntity<Object> nullFieldsInBody(NullFieldsException nullFieldsException) {
        return new ResponseEntity<>("Null Fields in Body", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = StudentNotFoundException.class)
    public ResponseEntity<Object> studentNotFound(StudentNotFoundException studentNotFoundException){
        return new ResponseEntity<>("Student with that roll number not found",HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = StudentAlreadyExistsException.class)
    public ResponseEntity<Object> studentAlreadyExists(StudentAlreadyExistsException studentAlreadyExistsException){
        return new ResponseEntity<>("A Student with that roll number already exists",HttpStatus.BAD_REQUEST);
    }

}
