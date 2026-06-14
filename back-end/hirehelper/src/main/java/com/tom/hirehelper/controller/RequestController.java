package com.tom.hirehelper.controller;

import com.tom.hirehelper.dto.RequestSubmission;
import com.tom.hirehelper.entity.Request;
import com.tom.hirehelper.service.RequestService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/requests")
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @PostMapping
    public Request createRequest(@RequestBody RequestSubmission submission) {
        return requestService.createRequest(submission);
    }

    @GetMapping("/received")
    public List<Request> getReceivedRequests() {
        return requestService.getReceivedRequests();
    }

    @GetMapping("/sent")
    public List<Request> getSentRequests() {
        return requestService.getSentRequests();
    }

    @PutMapping("/{id}/status")
    public Request updateRequestStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return requestService.updateRequestStatus(id, status);
    }
}
