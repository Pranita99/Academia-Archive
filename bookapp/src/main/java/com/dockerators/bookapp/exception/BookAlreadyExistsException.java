package com.dockerators.bookapp.exception;

public class BookAlreadyExistsException extends RuntimeException{
    public BookAlreadyExistsException(){
        super("A Book with that code already exists.");

    }
}
