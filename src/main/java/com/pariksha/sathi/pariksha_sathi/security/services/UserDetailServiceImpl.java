package com.pariksha.sathi.pariksha_sathi.security.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import com.pariksha.sathi.pariksha_sathi.beans.User;
import com.pariksha.sathi.pariksha_sathi.repositories.UserRepository;
import com.pariksha.sathi.pariksha_sathi.security.beans.UserDetail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService{

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetail loadUserByUsername(String username) throws UsernameNotFoundException {
        User user =userRepository.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("User not found with username : "+username));        
        List<GrantedAuthority> authorities=new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        UserDetail userDetail=new UserDetail(user.getId(), user.getUsername(), user.getPassword(),authorities);
        return userDetail;
    }
    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }    
}
