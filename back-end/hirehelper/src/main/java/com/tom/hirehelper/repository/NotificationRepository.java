package com.tom.hirehelper.repository;

import com.tom.hirehelper.entity.Notification;
import com.tom.hirehelper.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
}
