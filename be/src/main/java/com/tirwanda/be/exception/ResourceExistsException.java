package com.tirwanda.be.exception;

import java.io.Serial;

public class ResourceExistsException extends Exception{

    @Serial
    private static final long serialVersionUID = 7051352798128779320L;

    public ResourceExistsException(String message) {
        super(message);
    }
}
