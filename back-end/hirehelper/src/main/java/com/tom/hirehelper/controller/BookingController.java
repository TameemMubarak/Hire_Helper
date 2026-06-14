package com.tom.hirehelper.controller;

import com.tom.hirehelper.dto.BookingRequest;
import com.tom.hirehelper.entity.Booking;
import com.tom.hirehelper.service.BookingService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(
            BookingService bookingService) {

        this.bookingService =
                bookingService;
    }

    @PostMapping
    public Booking createBooking(
            @RequestBody BookingRequest request) {

        return bookingService
                .createBooking(request);
    }

    @GetMapping("/{email}")
    public List<Booking> getBookings(
            @PathVariable String email) {

        return bookingService
                .getUserBookings(email);
    }
}