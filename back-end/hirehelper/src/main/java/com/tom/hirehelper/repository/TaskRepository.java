package com.tom.hirehelper.repository;

import com.tom.hirehelper.entity.Task;
import com.tom.hirehelper.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByCreator(User creator);
    List<Task> findByCreatorNot(User creator);
}
