package com.pariksha.sathi.pariksha_sathi.controllers.api;

import java.security.Principal;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.pariksha.sathi.pariksha_sathi.beans.Subject;
import com.pariksha.sathi.pariksha_sathi.beans.SubjectResult;
import com.pariksha.sathi.pariksha_sathi.beans.User;
import com.pariksha.sathi.pariksha_sathi.repositories.QuestionRespository;
import com.pariksha.sathi.pariksha_sathi.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/user")
@RestController
public class UserApi {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    QuestionRespository questionRespository;

    @RequestMapping("/subjects")
    public ResponseEntity<?> getUserSubjects(Authentication authentication, Principal principal) {
        Map<Object, Object> response = new HashMap<>();
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Map<String, Boolean> subjects = userRepository.findSubjectsByUsername(username).getSubjects();
        List<String> sub = new LinkedList<>();
        subjects.forEach((subject, attempted) -> {
            if (!attempted)
                sub.add(subject);
        });
        response.put("subjects", sub);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/result")
    public ResponseEntity<?> getResult() {
        List<SubjectResult> result = new LinkedList<>();
        User user=userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).get();
        user.getSubjects().forEach((subject,attempted)->{
            if(!attempted) return;
            Subject s=questionRespository.findBySubjectName(subject.replace(" ", "-"));
            if(s==null) return;
            List<Integer> answers=s.getAnswers();

            if(answers==null) return;
            List<Integer> response=user.getResponse().get(subject);

            if(response==null) return;
            int outOff=answers.size();
            int marks=0;
            for(int i=0;i<answers.size();i++){
                if(response.get(i)==answers.get(i)) marks+=1;
            }
            result.add(new SubjectResult(subject, marks, outOff));
        });
        return ResponseEntity.ok(result);
    }
}
