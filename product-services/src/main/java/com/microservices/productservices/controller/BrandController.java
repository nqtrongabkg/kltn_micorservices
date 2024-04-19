package com.microservices.productservices.controller;

import com.microservices.productservices.payload.request.BrandRequest;
import com.microservices.productservices.payload.response.BrandResponse;
import com.microservices.productservices.service.BrandService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("product-services/api/brands")
public class BrandController {

    private final BrandService brandService;

    public BrandController(BrandService brandService) {
        this.brandService = brandService;
    }

    @PostMapping("/create")
    public ResponseEntity<BrandResponse> createBrand(@RequestBody BrandRequest brandRequest) {
        BrandResponse createdBrand = brandService.create(brandRequest);
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
    public ResponseEntity<BrandResponse> updateBrand(@RequestBody BrandRequest brandRequest, @PathVariable UUID id) {
        BrandResponse updatedBrand = brandService.update(id, brandRequest);
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
