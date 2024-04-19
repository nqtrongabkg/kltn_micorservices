package com.microservices.productservices.service;

import com.microservices.productservices.payload.request.BrandRequest;
import com.microservices.productservices.payload.response.BrandResponse;

import java.util.List;
import java.util.UUID;

public interface BrandService {

    BrandResponse create(BrandRequest brandRequest);

    BrandResponse getById(UUID id);

    List<BrandResponse> getAll();

    BrandResponse update(UUID id, BrandRequest brandRequest);

    BrandResponse delete(UUID id);

    List<BrandResponse> findByUser(UUID id);
}
