package com.tom.hirehelper.controller;

import com.tom.hirehelper.dto.BookingRequest;
import com.tom.hirehelper.service.BookingService;

import org.springframework.web.bind.annotation.*;

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
    public String bookService(
            @RequestBody
            BookingRequest request) {

        return bookingService
                .createBooking(request);
    }

    @GetMapping("/my")
    public java.util.List<com.tom.hirehelper.entity.Booking> getMyBookings() {
        return bookingService.getMyBookings();
    }
}