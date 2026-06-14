package com.tom.hirehelper.service;

import com.tom.hirehelper.dto.BookingRequest;
import com.tom.hirehelper.entity.Booking;
import com.tom.hirehelper.entity.User;
import com.tom.hirehelper.repository.BookingRepository;
import com.tom.hirehelper.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    public BookingService(
            BookingRepository bookingRepository,
            UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    public String createBooking(
            BookingRequest request) {

        Booking booking =
                new Booking();

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Authenticated user not found"));

        booking.setUserId(user.getId());

        booking.setProviderId(
                request.getProviderId());

        booking.setBookingDate(
                request.getBookingDate());

        booking.setBookingTime(
                request.getBookingTime());

        booking.setStatus("PENDING");

        bookingRepository.save(
                booking);

        return "Booking Created";
    }

    public java.util.List<Booking> getMyBookings() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Authenticated user not found"));

        return bookingRepository.findByUserId(user.getId());
    }
}