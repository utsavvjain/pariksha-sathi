package com.pariksha.sathi.pariksha_sathi.security.jwt;

import java.util.Date;

import com.pariksha.sathi.pariksha_sathi.security.beans.UserDetail;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
@Component
public class JwtUtils {
    @Value("app.jwtSecret")
    private String jwtSecret;
    private int jwtExpirationMs=86400000;
    public String generateJwtToken(Authentication authentication){
        UserDetail userDetail=(UserDetail)authentication.getPrincipal();
        return Jwts.builder().setSubject(userDetail.getUsername()).setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime()+jwtExpirationMs)).signWith(SignatureAlgorithm.HS512,jwtSecret).compact();
    }
    public String getUsernameFromToken(String token){
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }
    public boolean validateJwtToken(String authToken){
        try{
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        }catch(Exception exception){
            return false;
        }
    }
}
