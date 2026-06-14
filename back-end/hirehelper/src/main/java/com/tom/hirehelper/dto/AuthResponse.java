package com.tom.hirehelper.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String status; // OTP_SENT, VERIFIED, ERROR
    private String email;
    private String token;
}
