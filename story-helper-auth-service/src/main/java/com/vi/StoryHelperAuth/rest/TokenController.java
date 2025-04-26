package com.vi.StoryHelperAuth.rest;

import com.vi.StoryHelperAuth.service.JwtService;
import com.vi.StoryHelperAuth.service.UserService;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/token")
@Slf4j
@AllArgsConstructor
public class TokenController {
    private final UserService userService;
    private final JwtService jwtService;

    @PostMapping("/check")
    public boolean check(@PathParam("token") String token, @PathParam("username") String username) {
        UserDetails userDetails = userService
                .loadUserByUsername(username);
        return jwtService.isTokenValid(token, userDetails);
    }
}
