package com.pariksha.sathi.pariksha_sathi.beans;

public class SubjectResult {
    private String subjectName;
    private int marks;
    private int outOff;

    public SubjectResult(String subjectName, int marks, int outOff) {
        this.subjectName = subjectName;
        this.marks = marks;
        this.outOff = outOff;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public int getOutOff() {
        return outOff;
    }

    public void setOutOff(int outOff) {
        this.outOff = outOff;
    }

    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

}
