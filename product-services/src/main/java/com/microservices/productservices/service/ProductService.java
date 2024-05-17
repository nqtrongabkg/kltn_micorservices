package com.microservices.productservices.service;

import com.microservices.productservices.payload.request.ProductRequest;
import com.microservices.productservices.payload.response.ProductResponse;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    
    ProductResponse create(ProductRequest productRequest);

    void setImage(UUID id, String image);

    void switchStatus(UUID id);

    void trash(UUID id);

    void isDisplay(UUID id);
    
    ProductResponse getById(UUID id);
    
    List<ProductResponse> getAll();

    List<ProductResponse> findByUser(UUID id);
    
    ProductResponse update(UUID id, ProductRequest productRequest);
    
    ProductResponse delete(UUID id);
    
    List<ProductResponse> findByBrandId(UUID brandId);

    List<ProductResponse> searchByName(String name);
    
}
