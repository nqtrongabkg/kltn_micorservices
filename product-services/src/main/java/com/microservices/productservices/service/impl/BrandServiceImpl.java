package com.microservices.productservices.service.impl;

import com.microservices.productservices.entity.Brand;
import com.microservices.productservices.payload.request.BrandRequest;
import com.microservices.productservices.payload.response.BrandResponse;
import com.microservices.productservices.repository.BrandRepository;
import com.microservices.productservices.service.BrandService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    private void deleteAvatar(String fileName) {
        try {
            Path filePath = Paths.get("src/main/resources/static/brands/" + fileName);
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete old avatar");
        }
    }

    private String saveAvatar(MultipartFile avatar) {
        String fileName = UUID.randomUUID().toString() + "-" + avatar.getOriginalFilename();
        try {
            // Lưu tệp vào thư mục tĩnh của ứng dụng
            Path filePath = Paths.get("src/main/resources/static/brands/" + fileName);
            Files.copy(avatar.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save avatar file");
        }
        return fileName;
    }

    @Override
    public BrandResponse create(BrandRequest brandRequest, MultipartFile image) {
        Brand brand = new Brand();
        mapRequestToEntity(brandRequest, brand);
        brand.setCreatedAt(LocalDateTime.now());
        // Save image if provided
        if (image != null) {
            String avatarFileName = saveAvatar(image);
            brand.setImage(avatarFileName);
        }
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
    public BrandResponse update(UUID id, BrandRequest brandRequest, MultipartFile newImage) {
        Brand existingBrand = brandRepository.findById(id).orElse(null);
        if (existingBrand != null) {
            mapRequestToEntity(brandRequest, existingBrand);
            existingBrand.setUpdatedAt(LocalDateTime.now());
            // Check if a new image is provided
            if (newImage != null && !newImage.isEmpty()) {
                // Delete old avatar if it exists
                if (existingBrand.getImage() != null && !existingBrand.getImage().isEmpty()) {
                    deleteAvatar(existingBrand.getImage());
                }
                // Save new avatar
                String avatarFileName = saveAvatar(newImage);
                existingBrand.setImage(avatarFileName);
            }
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
            return BrandResponse.builder()
                    .id(brand.getId())
                    .name(brand.getName())
                    .description(brand.getDescription())
                    .image(brand.getImage())
                    .createdAt(brand.getCreatedAt())
                    .updatedAt(brand.getUpdatedAt())
                    .createdBy(brand.getCreatedBy())
                    .updatedBy(brand.getUpdatedBy())
                    .status(brand.getStatus())
                    .build();
        }
        return null;
    }

    private void mapRequestToEntity(BrandRequest brandRequest, Brand brand) {
        BeanUtils.copyProperties(brandRequest, brand);
    }
}
