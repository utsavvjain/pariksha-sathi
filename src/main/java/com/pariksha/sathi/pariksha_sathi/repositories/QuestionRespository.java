package com.pariksha.sathi.pariksha_sathi.repositories;

import com.pariksha.sathi.pariksha_sathi.beans.Subject;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionRespository extends MongoRepository<Subject,String>{
    
    public Subject findBySubjectName(String subjectName);
}
