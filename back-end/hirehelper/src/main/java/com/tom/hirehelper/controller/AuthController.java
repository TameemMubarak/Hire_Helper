package com.tom.hirehelper.controller;

import com.tom.hirehelper.dto.AuthResponse;
import com.tom.hirehelper.dto.LoginRequest;
import com.tom.hirehelper.dto.RegisterRequest;
import com.tom.hirehelper.dto.VerifyOtpRequest;
import com.tom.hirehelper.entity.User;
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
    public AuthResponse register(
            @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/verify-otp")
    public AuthResponse verifyOtp(
            @RequestBody VerifyOtpRequest verifyOtpRequest) {
        return authService.verifyOtp(verifyOtpRequest);
    }

    @GetMapping("/profile")
    public User getProfile() {
        return authService.getProfile();
    }

    @PutMapping("/profile")
    public User updateProfile(@RequestBody User updateDetails) {
        return authService.updateProfile(updateDetails);
    }
}