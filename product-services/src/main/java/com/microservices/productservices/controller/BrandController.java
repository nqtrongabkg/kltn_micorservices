package com.microservices.productservices.controller;

import com.microservices.productservices.payload.request.BrandRequest;
import com.microservices.productservices.payload.response.BrandResponse;
import com.microservices.productservices.service.BrandService;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import java.nio.file.Path;

@RestController
@RequestMapping("product-services/api/brands")
@CrossOrigin(origins = { "http://localhost:3000" })
public class BrandController {

    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @GetMapping("/brands/{filename:.+}")
    public ResponseEntity<Resource> getUserAvatar(@PathVariable String filename) {
        try {
            Path fileStorageLocation = Paths.get("src/main/resources/static/brands").toAbsolutePath().normalize();
            Path filePath = fileStorageLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) 
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<BrandResponse> createBrand(
        @RequestPart("brandRequest") BrandRequest brandRequest,
        @RequestPart("image") MultipartFile imageFile) {
        BrandResponse createdBrand = brandService.create(brandRequest, imageFile);
        return new ResponseEntity<>(createdBrand, HttpStatus.CREATED);
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<BrandResponse> getBrandById(@PathVariable UUID id) {
        BrandResponse brand = brandService.getById(id);
        if (brand != null) {
            return ResponseEntity.ok(brand);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<BrandResponse>> getAllBrands() {
        List<BrandResponse> brands = brandService.getAll();
        return ResponseEntity.ok(brands);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BrandResponse> updateBrand(
        @PathVariable UUID id,
        @RequestPart("brandRequest") BrandRequest brandRequest, 
        @RequestPart("image") MultipartFile image
        ) {
        BrandResponse updatedBrand = brandService.update(id, brandRequest, image);
        if (updatedBrand != null) {
            return ResponseEntity.ok(updatedBrand);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BrandResponse> deleteBrand(@PathVariable UUID id) {
        BrandResponse deletedBrand = brandService.delete(id);
        if (deletedBrand != null) {
            return ResponseEntity.ok(deletedBrand);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get-by-user/{userId}")
    public ResponseEntity<List<BrandResponse>> getBrandsByUser(@PathVariable UUID userId) {
        List<BrandResponse> brands = brandService.findByUser(userId);
        return ResponseEntity.ok(brands);
    }

}
