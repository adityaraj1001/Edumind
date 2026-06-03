package com.edumind.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.edumind.backend.model.Notes;

public interface NotesRepository
extends MongoRepository<Notes,String>{

    int countByUserEmail(
            String userEmail
    );

}