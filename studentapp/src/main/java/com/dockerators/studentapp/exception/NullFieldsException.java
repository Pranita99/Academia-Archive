package com.dockerators.studentapp.exception;

public class NullFieldsException extends RuntimeException {
    public NullFieldsException() {
        super("Null Fields in Request");
    }
}
