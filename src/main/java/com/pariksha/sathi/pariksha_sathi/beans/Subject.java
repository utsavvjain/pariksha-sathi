package com.pariksha.sathi.pariksha_sathi.beans;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("pariksha-sathi-subjects")
public class Subject {
    @Id
    private String id;
    private String subjectCode;
    private String subjectName;
    private List<Question> questions;
    private List<String> answers;

    public Subject(String subjectCode, String subjectName, List<Question> questions, List<String> answers) {
        this.subjectCode = subjectCode;
        this.subjectName = subjectName;
        this.questions = questions;
        this.answers = answers;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public String getSubjectCode() {
        return this.subjectCode;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getSubjectName() {
        return this.subjectName;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public List<Question> getOptions() {
        return this.questions;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }

    public List<String> getAnswers() {
        return this.answers;
    }
}
