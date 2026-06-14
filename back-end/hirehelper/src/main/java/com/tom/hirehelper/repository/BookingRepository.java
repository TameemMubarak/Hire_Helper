package com.tom.hirehelper.repository;

import com.tom.hirehelper.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository
        extends JpaRepository<Booking, Long> {

    List<Booking> findByUserEmail(
            String userEmail);
}