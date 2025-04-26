package com.vi.StoryHelperAuth.rest;

import com.vi.StoryHelperAuth.model.JwtAuthenticationResponse;
import com.vi.StoryHelperAuth.model.User;
import com.vi.StoryHelperAuth.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Slf4j
@AllArgsConstructor
public class UserController {
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public JwtAuthenticationResponse login(@RequestBody User request) {
        return authenticationService.signIn(request);
    }

    @PostMapping("/register")
    public JwtAuthenticationResponse register(@RequestBody User request) {
        return authenticationService.signUp(request);
    }
}
