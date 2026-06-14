package com.tom.hirehelper.service;

import com.tom.hirehelper.dto.AuthResponse;
import com.tom.hirehelper.dto.LoginRequest;
import com.tom.hirehelper.dto.RegisterRequest;
import com.tom.hirehelper.dto.VerifyOtpRequest;
import com.tom.hirehelper.entity.User;
import com.tom.hirehelper.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.tom.hirehelper.security.JwtService;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Thread-safe in-memory OTP storage
    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    private void generateAndSendOtp(String email) {
        String otp = String.format("%06d", new Random().nextInt(1000000));
        otpStorage.put(email, otp);

        System.out.println("\n========================================");
        System.out.println("OTP CODE FOR " + email + ": " + otp);
        System.out.println("========================================\n");
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setProfilePicture(request.getProfilePicture());

        userRepository.save(user);

        // Generate OTP upon registration
        generateAndSendOtp(user.getEmail());

        return AuthResponse.builder()
                .status("OTP_SENT")
                .email(user.getEmail())
                .build();
    }

    public AuthResponse login(LoginRequest loginRequest) {
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

        // Generate OTP upon login
        generateAndSendOtp(user.getEmail());

        return AuthResponse.builder()
                .status("OTP_SENT")
                .email(user.getEmail())
                .build();
    }

    public AuthResponse verifyOtp(VerifyOtpRequest request) {
        String email = request.getEmail();
        String enteredOtp = request.getOtp();

        if (!otpStorage.containsKey(email) || !otpStorage.get(email).equals(enteredOtp)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired OTP");
        }

        // OTP is correct, remove it and generate token
        otpStorage.remove(email);

        String token = jwtService.generateToken(email);

        return AuthResponse.builder()
                .status("VERIFIED")
                .email(email)
                .token(token)
                .build();
    }

    public User getProfile() {
        Object principal = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;
        if (principal instanceof org.springframework.security.core.userdetails.UserDetails) {
            email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        
        // Return a copy or set password null for return payload security
        user.setPassword(null);
        return user;
    }

    public User updateProfile(User updateDetails) {
        Object principal = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;
        if (principal instanceof org.springframework.security.core.userdetails.UserDetails) {
            email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        if (updateDetails.getFirstName() != null) user.setFirstName(updateDetails.getFirstName());
        if (updateDetails.getLastName() != null) user.setLastName(updateDetails.getLastName());
        if (updateDetails.getPhoneNumber() != null) user.setPhoneNumber(updateDetails.getPhoneNumber());
        if (updateDetails.getProfilePicture() != null) user.setProfilePicture(updateDetails.getProfilePicture());

        User saved = userRepository.save(user);
        saved.setPassword(null);
        return saved;
    }
}

