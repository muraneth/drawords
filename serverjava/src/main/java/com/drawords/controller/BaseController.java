package com.drawords.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.drawords.Service.UserService;
import com.drawords.bean.User;

@RestController
@RequestMapping("/")
public class BaseController {

    @GetMapping(value = "/hello")
    public String hello() {
        return "";
    }

}
