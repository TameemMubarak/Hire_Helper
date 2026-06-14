package com.tom.hirehelper.service;

import com.tom.hirehelper.dto.BookingRequest;
import com.tom.hirehelper.entity.Booking;
import com.tom.hirehelper.repository.BookingRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(
            BookingRepository bookingRepository) {

        this.bookingRepository = bookingRepository;
    }

    public Booking createBooking(
            BookingRequest request) {

        Booking booking = new Booking();

        booking.setUserEmail(
                request.getUserEmail());

        booking.setProviderId(
                request.getProviderId());

        booking.setBookingDate(
                LocalDateTime.now());

        booking.setStatus("PENDING");

        return bookingRepository.save(
                booking);
    }

    public List<Booking> getUserBookings(
            String email) {

        return bookingRepository
                .findByUserEmail(email);
    }
}