package com.microservices.productservices.service;

import com.microservices.productservices.payload.request.BrandRequest;
import com.microservices.productservices.payload.response.BrandResponse;

import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public interface BrandService {

    BrandResponse create(BrandRequest brandRequest, MultipartFile image);

    BrandResponse getById(UUID id);

    List<BrandResponse> getAll();

    BrandResponse update(UUID id, BrandRequest brandRequest, MultipartFile newImage);

    BrandResponse delete(UUID id);

    List<BrandResponse> findByUser(UUID id);
}
