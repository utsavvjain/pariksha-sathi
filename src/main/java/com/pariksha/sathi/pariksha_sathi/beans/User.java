package com.pariksha.sathi.pariksha_sathi.beans;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private Map<String,Boolean> subjects;
    private Map<String,List<Integer>> responses;

    public String getId() {
        return this.id;
    }

    public Map<String,List<Integer>> getResponse() {
        return responses;
    }

    public void setResponse(Map<String,List<Integer>> responses) {
        this.responses = responses;
    }

    public String getUsername() {
        return username;
    }

    public Map<String,Boolean> getSubjects() {
        return subjects;
    }

    public void setSubjects(Map<String,Boolean> subjects) {
        this.subjects = subjects;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}
