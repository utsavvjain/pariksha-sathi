package com.pariksha.sathi.pariksha_sathi.controllers.api;

import java.util.HashMap;
import java.util.Map;

import com.pariksha.sathi.pariksha_sathi.repositories.UserRepository;
import com.pariksha.sathi.pariksha_sathi.security.jwt.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
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

    @PostMapping("/signin")
    public ResponseEntity<?> authentication(@RequestBody Map<String,String> userDetails){
        Authentication authentication=authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(userDetails.get("username"), userDetails.get("password")));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            Map<String,Object> details=new HashMap<>();
            details.put("user",userDetails);
            details.put("JWT",jwt);
            return ResponseEntity.ok(details);


    }


}
