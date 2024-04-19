package com.microservices.userservices.repository;

import com.microservices.userservices.entity.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserCredentialRepository  extends JpaRepository<UserCredential,UUID> {
    Optional<UserCredential> findByUserName(String userName);
    Optional<UserCredential> findById(UUID id);
}
