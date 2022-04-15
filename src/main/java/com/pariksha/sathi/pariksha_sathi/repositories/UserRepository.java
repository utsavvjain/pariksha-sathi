package com.pariksha.sathi.pariksha_sathi.repositories;

import java.util.Optional;

import com.pariksha.sathi.pariksha_sathi.beans.User;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String>{
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);    
}
