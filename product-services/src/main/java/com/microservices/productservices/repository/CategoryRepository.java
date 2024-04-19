package com.microservices.productservices.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.microservices.productservices.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, UUID> {

}
