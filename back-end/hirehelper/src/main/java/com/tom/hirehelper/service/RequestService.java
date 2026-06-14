package com.tom.hirehelper.service;

import com.tom.hirehelper.dto.RequestSubmission;
import com.tom.hirehelper.entity.Request;
import com.tom.hirehelper.entity.Task;
import com.tom.hirehelper.entity.User;
import com.tom.hirehelper.repository.RequestRepository;
import com.tom.hirehelper.repository.TaskRepository;
import com.tom.hirehelper.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class RequestService {

    private final RequestRepository requestRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public RequestService(
            RequestRepository requestRepository,
            TaskRepository taskRepository,
            UserRepository userRepository,
            NotificationService notificationService) {
        this.requestRepository = requestRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
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

    public Request createRequest(RequestSubmission submission) {
        User requester = getCurrentUser();
        Task task = taskRepository.findById(submission.getTaskId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));

        if (task.getCreator().getId().equals(requester.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot request to help on your own task");
        }

        if (requestRepository.findByTaskAndRequester(task, requester).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have already requested to help on this task");
        }

        Request request = Request.builder()
                .task(task)
                .requester(requester)
                .status("PENDING")
                .build();

        Request saved = requestRepository.save(request);

        // Notify the task creator
        notificationService.createNotification(
                task.getCreator(),
                "User " + requester.getUsername() + " requested to help on your task: \"" + task.getTitle() + "\""
        );

        return saved;
    }

    public List<Request> getReceivedRequests() {
        User creator = getCurrentUser();
        return requestRepository.findByTaskCreator(creator);
    }

    public List<Request> getSentRequests() {
        User requester = getCurrentUser();
        return requestRepository.findByRequester(requester);
    }

    public Request updateRequestStatus(Long requestId, String status) {
        User taskOwner = getCurrentUser();
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Request not found"));

        if (!request.getTask().getCreator().getId().equals(taskOwner.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only the task creator can accept or reject requests");
        }

        String normalizedStatus = status.trim().toUpperCase();
        if (!normalizedStatus.equals("ACCEPTED") && !normalizedStatus.equals("REJECTED")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid status. Use ACCEPTED or REJECTED");
        }

        request.setStatus(normalizedStatus);
        Request updated = requestRepository.save(request);

        // Update task status if accepted
        if (normalizedStatus.equals("ACCEPTED")) {
            Task task = request.getTask();
            task.setStatus("ACCEPTED");
            taskRepository.save(task);
        }

        // Notify helper
        notificationService.createNotification(
                request.getRequester(),
                "Your request to help on task \"" + request.getTask().getTitle() + "\" has been " + normalizedStatus.toLowerCase()
        );

        return updated;
    }
}
