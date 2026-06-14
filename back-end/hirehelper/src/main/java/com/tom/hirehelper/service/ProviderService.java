package com.tom.hirehelper.service;

import com.tom.hirehelper.entity.Provider;
import com.tom.hirehelper.repository.ProviderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderService {

    private final ProviderRepository providerRepository;

    public ProviderService(
            ProviderRepository providerRepository) {

        this.providerRepository = providerRepository;
    }

    public Provider addProvider(
            Provider provider) {

        return providerRepository.save(provider);
    }

    public List<Provider> getAllProviders() {

        return providerRepository.findAll();
    }

    public List<Provider> getProvidersBySkill(
            String skill) {

        return providerRepository.findBySkill(skill);
    }

    public Provider getProviderById(Long id){
        return providerRepository.findById(id).orElseThrow(()-> new RuntimeException("provider not found"));
    }
}