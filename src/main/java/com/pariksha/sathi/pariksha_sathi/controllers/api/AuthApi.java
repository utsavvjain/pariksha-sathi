package com.pariksha.sathi.pariksha_sathi.controllers.api;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import java.util.List;
import java.util.Map;

import com.pariksha.sathi.pariksha_sathi.beans.User;
import com.pariksha.sathi.pariksha_sathi.repositories.UserRepository;
import com.pariksha.sathi.pariksha_sathi.security.jwt.JwtUtils;
import com.pariksha.sathi.pariksha_sathi.security.services.UserDetailServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthApi {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
	JwtUtils jwtUtils;
    @Autowired
    UserDetailServiceImpl userDetailServiceImpl;
    @PostMapping("/signin")
    public ResponseEntity<?> authentication(@RequestBody Map<String,String> userDetails){
        Authentication authentication=authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(userDetails.get("username"), userDetails.get("password")));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            Map<String,Object> details=new HashMap<>();
            userDetails.remove("password");
            details.put("user",userDetails);
            details.put("JWT",jwt);
            return ResponseEntity.ok(details);


    }
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody Map<String,String> userDetails){
        Map<String,String> errors=new HashMap<>();
        if(userDetailServiceImpl.existsByUsername(userDetails.getOrDefault("username"," "))) {
            errors.put("username","Username already exists");
            return ResponseEntity.badRequest().body(errors);
        }
        User user=new User();
        user.setUsername(userDetails.get("username"));
        user.setPassword(encoder.encode(userDetails.get("password")));
        Map<String,Boolean> subjects=new HashMap<>();
        subjects.put("Project Management",false);
        subjects.put("Machine Learning",false);
        subjects.put("Computer Networks",false);
        subjects.put("Data Analytics",false);
        subjects.put("Compiler Designing",false);

        Map<String,List<Integer>> responses=new HashMap<>();

        responses.put("Project Management",new ArrayList<>());
        responses.put("Machine Learning",new ArrayList<>());
        responses.put("Computer Networks",new ArrayList<>());
        responses.put("Data Analytics",new ArrayList<>());
        responses.put("Compiler Designing",new ArrayList<>());
        user.setResponse(responses);
        user.setSubjects(subjects);
        userRepository.save(user);
        return ResponseEntity.ok("User Registered");
    }
}
