package com.microservices.productservices.service;

import com.microservices.productservices.payload.request.CategoryRequest;
import com.microservices.productservices.payload.response.CategoryResponse;

import java.util.List;
import java.util.UUID;

public interface CategoryService {

    CategoryResponse create(CategoryRequest categoryRequest);

    CategoryResponse getById(UUID id);

    List<CategoryResponse> getAll();

    CategoryResponse update(UUID id, CategoryRequest categoryRequest);

    CategoryResponse delete(UUID id);
}
