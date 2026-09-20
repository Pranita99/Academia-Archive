package com.dockerators.bookapp.exception;

public class BookNotFoundException extends RuntimeException{
    public BookNotFoundException(){
        super("A Book with that code not found");
    }
}
