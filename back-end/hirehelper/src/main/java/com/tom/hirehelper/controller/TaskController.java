package com.tom.hirehelper.controller;

import com.tom.hirehelper.dto.TaskRequest;
import com.tom.hirehelper.entity.Task;
import com.tom.hirehelper.service.TaskService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public Task createTask(@RequestBody TaskRequest request) {
        return taskService.createTask(request);
    }

    @GetMapping
    public List<Task> getTasksFeed() {
        return taskService.getTasksFeed();
    }

    @GetMapping("/my")
    public List<Task> getMyTasks() {
        return taskService.getMyTasks();
    }
}
