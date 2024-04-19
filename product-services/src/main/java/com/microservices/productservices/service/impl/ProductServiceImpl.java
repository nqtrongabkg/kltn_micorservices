package com.microservices.productservices.service.impl;

import com.microservices.productservices.entity.Product;
import com.microservices.productservices.entity.ProductCategory;
import com.microservices.productservices.payload.request.ProductRequest;
import com.microservices.productservices.payload.response.ProductResponse;
import com.microservices.productservices.repository.ProductCategoryRepository;
import com.microservices.productservices.repository.ProductRepository;
import com.microservices.productservices.service.ProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, ProductCategoryRepository productCategoryRepository) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
    }

    @Override
    public ProductResponse create(ProductRequest productRequest) {
        Product product = new Product();
        mapRequestToEntity(productRequest, product);
        product.setCreatedAt(LocalDateTime.now());
        Product savedProduct = productRepository.save(product);

        // Create ProductCategory entities for each category ID in the request
        List<ProductCategory> productCategories = new ArrayList<>();
        for (UUID categoryId : productRequest.getCategoryIds()) {
            ProductCategory productCategory = new ProductCategory();
            productCategory.setProductId(savedProduct.getId());
            productCategory.setCategoryId(categoryId);
            productCategories.add(productCategory);
        }
        productCategoryRepository.saveAll(productCategories);

        return mapProductToResponse(savedProduct);
    }

    @Override
    public ProductResponse getById(UUID id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            return mapProductToResponse(product);
        }
        return null;
    }

    @Override
    public List<ProductResponse> getAll() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::mapProductToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponse update(UUID id, ProductRequest productRequest) {
        Product existingProduct = productRepository.findById(id).orElse(null);
        if (existingProduct != null) {
            mapRequestToEntity(productRequest, existingProduct);
            existingProduct.setUpdatedAt(LocalDateTime.now());
            Product updatedProduct = productRepository.save(existingProduct);
            return mapProductToResponse(updatedProduct);
        }
        return null;
    }

    @Override
    public ProductResponse delete(UUID id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            productRepository.delete(product);
            return mapProductToResponse(product);
        }
        return null;
    }

    @Override
    public List<ProductResponse> findByBrandId(UUID brandId) {
        List<Product> products = productRepository.findByBrandId(brandId);
        return products.stream()
                .map(this::mapProductToResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse mapProductToResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .brandId(product.getBrandId())
                .name(product.getName())
                .image(product.getImage())
                .price(product.getPrice())
                .detail(product.getDetail())
                .description(product.getDescription())
                .evaluate(product.getEvaluate())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .createdBy(product.getCreatedBy())
                .updatedBy(product.getUpdatedBy())
                .status(product.getStatus())
                .build();
    }

    private void mapRequestToEntity(ProductRequest productRequest, Product product) {
        BeanUtils.copyProperties(productRequest, product);
    }
}
