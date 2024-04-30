package com.microservices.productservices.controller;

import com.microservices.productservices.payload.request.ProductRequest;
import com.microservices.productservices.payload.request.SetImageRequest;
import com.microservices.productservices.payload.response.ProductResponse;
import com.microservices.productservices.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("product-services/api/products")
@CrossOrigin(origins = { "http://localhost:3000" })
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/create")
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductRequest productRequest) {
        ProductResponse createdProduct = productService.create(productRequest);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PutMapping("/set-image")
    public ResponseEntity<String> setImage(@RequestBody SetImageRequest setImageRequest) {
        productService.setImage(setImageRequest.getId(), setImageRequest.getImage());
        return ResponseEntity.ok("Set image done");
    }

    @PutMapping("/switch-status/{id}")
    public ResponseEntity<Void> switchStatus(@PathVariable UUID id) {
        productService.switchStatus(id);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/trash/{id}")
    public ResponseEntity<Void> trash(@PathVariable UUID id) {
        productService.trash(id);
        return ResponseEntity.ok().build();
    }  
    @PutMapping("/display/{id}")
    public ResponseEntity<Void> display(@PathVariable UUID id) {
        productService.isDisplay(id);
        return ResponseEntity.ok().build();
    }  

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable UUID id) {
        ProductResponse product = productService.getById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> products = productService.getAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/get-by-brand/{id}")
    public ResponseEntity<List<ProductResponse>> getByBrand(@PathVariable UUID id) {
        List<ProductResponse> products = productService.findByBrandId(id);
        return ResponseEntity.ok(products);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductResponse> updateProduct(@RequestBody ProductRequest productRequest, @PathVariable UUID id) {
        ProductResponse updatedProduct = productService.update(id, productRequest);
        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ProductResponse> deleteProduct(@PathVariable UUID id) {
        ProductResponse deletedProduct = productService.delete(id);
        if (deletedProduct != null) {
            return ResponseEntity.ok(deletedProduct);
        }
        return ResponseEntity.notFound().build();
    }
}
