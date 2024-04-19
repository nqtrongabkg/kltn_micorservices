package com.microservices.productservices.service.impl;

import com.microservices.productservices.connect.UserClient;
import com.microservices.productservices.entity.Brand;
import com.microservices.productservices.payload.request.BrandRequest;
import com.microservices.productservices.payload.response.BrandResponse;
import com.microservices.productservices.payload.response.UserResponse;
import com.microservices.productservices.repository.BrandRepository;
import com.microservices.productservices.service.BrandService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    @Autowired
    private UserClient userClient;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override
    public BrandResponse create(BrandRequest brandRequest) {
        Brand brand = new Brand();
        mapRequestToEntity(brandRequest, brand);
        brand.setCreatedAt(LocalDateTime.now());
        Brand savedBrand = brandRepository.save(brand);
        return mapBrandToBrandResponse(savedBrand);
    }

    @Override
    public BrandResponse getById(UUID id) {
        Brand brand = brandRepository.findById(id).orElse(null);
        if (brand != null) {
            return mapBrandToBrandResponse(brand);
        }
        return null;
    }

    @Override
    public List<BrandResponse> getAll() {
        List<Brand> brands = brandRepository.findAll();
        return brands.stream()
                .map(this::mapBrandToBrandResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BrandResponse update(UUID id, BrandRequest brandRequest) {
        Brand existingBrand = brandRepository.findById(id).orElse(null);
        if (existingBrand != null) {
            mapRequestToEntity(brandRequest, existingBrand);
            existingBrand.setUpdatedAt(LocalDateTime.now());
            Brand updatedBrand = brandRepository.save(existingBrand);
            return mapBrandToBrandResponse(updatedBrand);
        }
        return null;
    }

    @Override
    public BrandResponse delete(UUID id) {
        Brand brand = brandRepository.findById(id).orElse(null);
        if (brand != null) {
            brandRepository.delete(brand);
            return mapBrandToBrandResponse(brand);
        }
        return null;
    }

    @Override
    public List<BrandResponse> findByUser(UUID id) {
        List<Brand> brands = brandRepository.findByCreatedBy(id);
        return brands.stream()
                .map(this::mapBrandToBrandResponse)
                .collect(Collectors.toList());
    }

    private BrandResponse mapBrandToBrandResponse(Brand brand) {
        if (brand != null) {
            UserResponse userResponse = userClient.getUserById(brand.getCreatedBy());
            return BrandResponse.builder()
                    .id(brand.getId())
                    .name(brand.getName())
                    .description(brand.getDescription())
                    .logo(brand.getLogo())
                    .createdAt(brand.getCreatedAt())
                    .updatedAt(brand.getUpdatedAt())
                    .createdBy(brand.getCreatedBy())
                    .updatedBy(brand.getUpdatedBy())
                    .status(brand.getStatus())
                    .User(userResponse)
                    .build();
        }
        return null;
    }

    private void mapRequestToEntity(BrandRequest brandRequest, Brand brand) {
        BeanUtils.copyProperties(brandRequest, brand);
    }
}
