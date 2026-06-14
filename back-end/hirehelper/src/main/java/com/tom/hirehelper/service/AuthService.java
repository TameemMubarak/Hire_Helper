package com.tom.hirehelper.service;

import com.tom.hirehelper.dto.LoginRequest;
import com.tom.hirehelper.dto.RegisterRequest;
import com.tom.hirehelper.entity.User;
import com.tom.hirehelper.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.tom.hirehelper.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;
    // private final
    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    
    public String register(RegisterRequest request) {
        if (userRepository.findByEmail(
                request.getEmail()).isPresent()) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email already exists");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()));
        user.setRole(request.getRole());

        userRepository.save(user);
        return jwtService.generateToken(
        user.getEmail());
    }

    public String login(LoginRequest loginRequest) {
        User user = userRepository
                .findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid credentials"));

        if (!passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return token;
    }
}
