package com.edumind.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.edumind.backend.model.Course;

public interface CourseRepository
extends MongoRepository<Course,String>{

    int countByUserEmail(
            String userEmail
    );

    int countByUserEmailAndCompleted(
            String userEmail,
            boolean completed
    );

    List<Course> findByUserEmail(
            String userEmail
    );

}