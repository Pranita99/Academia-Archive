package com.dockerators.bookapp.rest;

import com.dockerators.bookapp.exception.BookAlreadyExistsException;
import com.dockerators.bookapp.exception.BookNotFoundException;
import com.dockerators.bookapp.exception.NullFieldsException;
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
        // Setting the error message Status code of the NullFieldsException
        return new ResponseEntity<>("Null Fields in Body.", HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = BookNotFoundException.class)
    public ResponseEntity<Object> bookNotFound(BookNotFoundException bookNotFoundException){
        // Setting the error message Status code of the BookNotFoundException
        return new ResponseEntity<>("A book with that code not found.",HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = BookAlreadyExistsException.class)
    public ResponseEntity<Object> bookAlreadyExists(BookAlreadyExistsException bookAlreadyExistsException){
        // Setting the error message Status code of the BookAlreadyExistsException
        return new ResponseEntity<>("A Book with that code already exists.",HttpStatus.NOT_FOUND);
    }
}
