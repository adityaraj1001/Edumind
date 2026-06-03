package com.edumind.backend.service;

import com.edumind.backend.model.User;
import com.edumind.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository repo;

    public User login(
            String email,
            String password
    ){

        System.out.println("Input Email: " + email);
        System.out.println("Input Password: " + password);

        User user =
                repo.findByEmail(email);

        System.out.println("Mongo User: " + user);

        if(
                user != null &&
                user.getPassword().equals(password)
        ){

            System.out.println("LOGIN SUCCESS");

            return user;
        }

        System.out.println("LOGIN FAILED");

        return null;
    }

}