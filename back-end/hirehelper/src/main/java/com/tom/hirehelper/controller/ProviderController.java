package com.tom.hirehelper.controller;

import com.tom.hirehelper.entity.Provider;
import com.tom.hirehelper.service.ProviderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/provider")
public class ProviderController {

    private final ProviderService providerService;

    public ProviderController(
            ProviderService providerService) {

        this.providerService = providerService;
    }

    @PostMapping
    public Provider addProvider(
            @RequestBody Provider provider) {

        return providerService.addProvider(provider);
    }

    @GetMapping
    public List<Provider> getAllProviders() {

        return providerService.getAllProviders();
    }

    @GetMapping("/skill/{skill}")
    public List<Provider> getBySkill(
            @PathVariable String skill) {

        return providerService
                .getProvidersBySkill(skill);
    }

    @GetMapping("/{id}")
public Provider getProviderById(
        @PathVariable Long id) {

    return providerService
            .getProviderById(id);
}
}