package com.pariksha.sathi.pariksha_sathi.controllers.api;

import java.security.Principal;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.pariksha.sathi.pariksha_sathi.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/user")
@RestController
public class UserApi {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/subjects")
    public ResponseEntity<?> getUserSubjects(Authentication authentication,Principal principal){
        Map<Object,Object> response=new HashMap<>();
        String username=SecurityContextHolder.getContext().getAuthentication().getName();
        Map<String,Boolean> subjects=userRepository.findSubjectsByUsername(username).getSubjects();
        List<String> sub=new LinkedList<>();
        subjects.forEach((subject,attempted)->{
            if(!attempted) sub.add(subject);
        });        
        response.put("subjects",sub);
        return ResponseEntity.ok(response);
    }
}
