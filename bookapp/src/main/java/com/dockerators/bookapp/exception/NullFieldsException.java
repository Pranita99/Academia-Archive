package com.dockerators.bookapp.exception;

public class NullFieldsException extends RuntimeException {
    public NullFieldsException() {
        super("Null Fields in Request");
    }
}

