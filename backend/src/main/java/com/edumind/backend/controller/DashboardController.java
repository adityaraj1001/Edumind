package com.edumind.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.edumind.backend.repository.CourseRepository;
import com.edumind.backend.repository.NotesRepository;


@RestController

@RequestMapping("/api/dashboard")

@CrossOrigin(
origins="http://localhost:3000"
)

public class DashboardController {


    @Autowired
    CourseRepository courseRepo;


    @Autowired
    NotesRepository notesRepo;



    @GetMapping("/{email}")

    public Map<String,Object>

    getDashboard(

            @PathVariable String email

    ){


        email=email.toLowerCase();


        int courses=

                courseRepo.countByUserEmail(

                        email

                );


        int completed=

                courseRepo.countByUserEmailAndCompleted(

                        email,

                        true

                );


        int notes=

                notesRepo.countByUserEmail(

                        email

                );


        int progress=0;


        if(courses>0){

            progress=

                    (completed*100)

                            / courses;

        }


        Map<String,Object> data=

                new HashMap<>();



        data.put(

                "courses",

                courses

        );


        data.put(

                "progress",

                progress

        );


        data.put(

                "notes",

                notes

        );


        data.put(

                "certificates",

                completed

        );


        return data;

    }

}