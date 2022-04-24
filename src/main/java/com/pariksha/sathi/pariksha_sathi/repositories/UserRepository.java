package com.pariksha.sathi.pariksha_sathi.repositories;

import java.util.List;
import java.util.Optional;

import com.pariksha.sathi.pariksha_sathi.beans.User;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    @Query(fields = "{'subjects' : 1,'_id': 0}")
    User findSubjectsByUsername(String username);

}
