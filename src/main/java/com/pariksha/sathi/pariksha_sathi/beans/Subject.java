package com.pariksha.sathi.pariksha_sathi.beans;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("pariksha-sathi-subjects")
public class Subject {
    @Id
    private String id;
    private String subjectName;
    private List<Question> questions;
    private List<Integer> answers;

    public Subject( String subjectName, List<Question> questions, List<Integer> answers) {
        this.subjectName = subjectName;
        this.questions = questions;
        this.answers = answers;
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

    public List<Question> getQuestions() {
        return this.questions;
    }

    public void setAnswers(List<Integer> answers) {
        this.answers = answers;
    }

    public List<Integer> getAnswers() {
        return this.answers;
    }
}
