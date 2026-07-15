package com.slightlyworse.swifthub.exception;

/** Thrown by services when a requested resource doesn't exist. Mapped to 404. */
public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
