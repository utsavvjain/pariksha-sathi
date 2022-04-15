package com.pariksha.sathi.pariksha_sathi.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.pariksha.sathi.pariksha_sathi.security.beans.UserDetail;
import com.pariksha.sathi.pariksha_sathi.security.services.UserDetailServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

public class AuthTokenFilter extends OncePerRequestFilter{
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserDetailServiceImpl userDetailService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
                String jwt=parseJwt(request);
                if(jwt!=null && jwtUtils.validateJwtToken(jwt)){
                    String username=jwtUtils.getUsernameFromToken(jwt);
                    UserDetail userDetail=userDetailService.loadUserByUsername(username);
                    UsernamePasswordAuthenticationToken auth=new UsernamePasswordAuthenticationToken(userDetail, null);
                    SecurityContextHolder.getContext().setAuthentication(auth);                    
                }
                filterChain.doFilter(request, response);
    }
    private String parseJwt(HttpServletRequest httpServletRequest){
        String headerAuth=httpServletRequest.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7, headerAuth.length());
          }
          return null;
    }
    
}
