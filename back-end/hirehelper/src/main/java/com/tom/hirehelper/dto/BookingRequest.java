package com.tom.hirehelper.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequest {

    private Long providerId;

    private String bookingDate;

    private String bookingTime;
}