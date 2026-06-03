package com.edumind.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="notes")

public class Notes{

    @Id
    private String id;

    private String title;

    private String userEmail;



    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title=title;
    }



    public String getUserEmail(){
        return userEmail;
    }

    public void setUserEmail(
                String userEmail
    ){
        this.userEmail=userEmail;
    }

}