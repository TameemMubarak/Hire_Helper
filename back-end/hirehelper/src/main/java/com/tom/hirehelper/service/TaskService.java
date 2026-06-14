package com.tom.hirehelper.service;

import com.tom.hirehelper.dto.TaskRequest;
import com.tom.hirehelper.entity.Task;
import com.tom.hirehelper.entity.User;
import com.tom.hirehelper.repository.TaskRepository;
import com.tom.hirehelper.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Authenticated user not found"));
    }

    public Task createTask(TaskRequest request) {
        User user = getCurrentUser();

        Task task = Task.builder()
                .creator(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .location(request.getLocation())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .status("PENDING")
                .picture(request.getPicture())
                .build();

        return taskRepository.save(task);
    }

    public List<Task> getTasksFeed() {
        User user = getCurrentUser();
        return taskRepository.findByCreatorNot(user);
    }

    public List<Task> getMyTasks() {
        User user = getCurrentUser();
        return taskRepository.findByCreator(user);
    }
}
