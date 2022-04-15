package com.pariksha.sathi.pariksha_sathi.security.services;

import com.pariksha.sathi.pariksha_sathi.beans.User;
import com.pariksha.sathi.pariksha_sathi.repositories.UserRepository;
import com.pariksha.sathi.pariksha_sathi.security.beans.UserDetail;

import org.springframework.beans.factory.annotation.Autowired;
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
        UserDetail userDetail=new UserDetail(user.getId(), user.getUsername(), user.getPassword(), null);
        return userDetail;
    }
}
