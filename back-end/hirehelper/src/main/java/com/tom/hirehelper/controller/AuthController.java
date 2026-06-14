package com.tom.hirehelper.controller;

import com.tom.hirehelper.dto.LoginRequest;
import com.tom.hirehelper.dto.RegisterRequest;
import com.tom.hirehelper.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(
            @RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @GetMapping("/profile")
    public String profile() {
        return "Protected Profile Data";
    }
}