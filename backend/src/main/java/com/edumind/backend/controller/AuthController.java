package com.edumind.backend.controller;

import com.edumind.backend.model.User;
import com.edumind.backend.repository.UserRepository;
import com.edumind.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController

@RequestMapping("/api/auth")

@CrossOrigin(origins="http://localhost:3000")

public class AuthController {


@Autowired
UserService service;


@Autowired
UserRepository repo;



@PostMapping("/login")

public User login(

@RequestBody User user

){

User foundUser=

service.login(

user.getEmail(),
user.getPassword()

);


if(foundUser==null){

throw new RuntimeException(

"Invalid Email"

);

}


return foundUser;

}




@PostMapping("/register")

public User register(

@RequestBody User user

){

return repo.save(

user

);

}


}