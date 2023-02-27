package ug.edu.apilarski.zad1.controler.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No such item id DB")
public class NotFoundException extends RuntimeException{
}