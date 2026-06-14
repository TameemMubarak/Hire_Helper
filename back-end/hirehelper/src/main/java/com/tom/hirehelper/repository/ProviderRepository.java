package com.tom.hirehelper.repository;

import com.tom.hirehelper.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProviderRepository
        extends JpaRepository<Provider, Long> {

    List<Provider> findBySkill(String skill);
}