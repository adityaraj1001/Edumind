package com.edumind.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.edumind.backend.model.Course;
import com.edumind.backend.repository.CourseRepository;

@RestController

@RequestMapping("/api/courses")

@CrossOrigin(
origins="http://localhost:3000"
)

public class CourseController {


    @Autowired
    CourseRepository courseRepo;



    // ADD COURSE

    @PostMapping

    public Course addCourse(

            @RequestBody Course course

    ){

        course.setUserEmail(

                course.getUserEmail()

                        .toLowerCase()

        );



        return courseRepo.save(

                course

        );

    }






    // GET ALL COURSES

    @GetMapping

    public List<Course> getAllCourses(){

        return courseRepo.findAll();

    }







    // GET COURSES BY USER EMAIL

    @GetMapping("/{email}")

    public List<Course> getCourses(

            @PathVariable String email

    ){

        return courseRepo.findByUserEmail(

                email.toLowerCase()

        );

    }








    // COMPLETE COURSE

    @PutMapping("/complete/{id}")

    public Course completeCourse(

            @PathVariable String id

    ){

        Course course =

                courseRepo.findById(id)

                        .orElseThrow();



        course.setCompleted(true);



        return courseRepo.save(course);

    }








    // UPDATE COURSE

    @PutMapping("/{id}")

    public Course updateCourse(

            @PathVariable String id,

            @RequestBody Course updated

    ){

        Course course =

                courseRepo.findById(id)

                        .orElseThrow();



        course.setTitle(

                updated.getTitle()

        );



        course.setCompleted(

                updated.isCompleted()

        );



        return courseRepo.save(

                course

        );

    }








    // DELETE COURSE

    @DeleteMapping("/{id}")

    public void deleteCourse(

            @PathVariable String id

    ){

        courseRepo.deleteById(id);

    }

}