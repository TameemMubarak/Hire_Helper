package com.tom.hirehelper.repository;

import com.tom.hirehelper.entity.Request;
import com.tom.hirehelper.entity.Task;
import com.tom.hirehelper.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByTaskCreator(User creator);
    List<Request> findByRequester(User requester);
    Optional<Request> findByTaskAndRequester(Task task, User requester);
}
