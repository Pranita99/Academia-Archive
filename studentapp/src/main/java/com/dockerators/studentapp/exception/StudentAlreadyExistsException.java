package com.dockerators.studentapp.exception;

public class StudentAlreadyExistsException extends RuntimeException {
    public StudentAlreadyExistsException(){
        super("A Student with that roll number already exists.");

    }
}
