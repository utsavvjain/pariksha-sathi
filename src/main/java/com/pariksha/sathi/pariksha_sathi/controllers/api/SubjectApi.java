package com.pariksha.sathi.pariksha_sathi.controllers.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.pariksha.sathi.pariksha_sathi.beans.Question;
import com.pariksha.sathi.pariksha_sathi.beans.Subject;
import com.pariksha.sathi.pariksha_sathi.beans.User;
import com.pariksha.sathi.pariksha_sathi.repositories.QuestionRespository;
import com.pariksha.sathi.pariksha_sathi.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/subject")
public class SubjectApi {
    @Autowired
    QuestionRespository questionRespository;
    @Autowired
    UserRepository userRepository;

    @GetMapping("/{subjectName}")
    public ResponseEntity<?> getQuestions(@PathVariable String subjectName) {
        Map<String, Object> responses = new HashMap<>();

        Subject subject = questionRespository.findBySubjectName(subjectName.trim());
        List<Question> questions = subject.getQuestions();
        responses.put("questions", subject.getQuestions());
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).get();
        List<Integer> response = user.getResponse().get(subjectName.replace("-", " "));
        if (response == null || response.size() != questions.size()) {
            response = new ArrayList<>(subject.getQuestions().size());
            for (int i = 0; i < questions.size(); i++)
                response.add(-1);
            Map<String, List<Integer>> a = user.getResponse();
            a.put(subjectName.replace("-", " "), response);
            user.setResponse(a);
        }
        responses.put("responses", response);
        Map<String, Boolean> subjects = user.getSubjects();
        subjects.put(subjectName.replace("-", " "), true);
        user.setSubjects(subjects);
        userRepository.save(user);
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/{subjectName}")
    public ResponseEntity<?> registerResponse(@PathVariable String subjectName,
            @RequestBody Map<String, Integer> questionResponse) {
        int questionIndex = questionResponse.get("questionIndex");
        int answerIndex = questionResponse.get("answerIndex");
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName())
                .get();
        Map<String, List<Integer>> res = user.getResponse();
        res.get(subjectName.replace("-", " ")).set(questionIndex, answerIndex);
        user.setResponse(res);
        userRepository.save(user);
        return ResponseEntity.ok("Response sent");
    }
}
