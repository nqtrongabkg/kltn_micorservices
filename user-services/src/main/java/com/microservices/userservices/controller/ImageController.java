package com.microservices.userservices.controller;

import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.nio.file.Paths;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;

import java.nio.file.Path;

@RestController
@RequestMapping("image-service/images")
@CrossOrigin(origins = { "http://localhost:3000" })
public class ImageController {

    @GetMapping("/users/{filename:.+}")
    public ResponseEntity<Resource> getUserAvatar(@PathVariable String filename) {
        try {
            Path fileStorageLocation = Paths.get("src/main/resources/static/users").toAbsolutePath().normalize();
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
    @GetMapping("/brands/{filename:.+}")
    public ResponseEntity<Resource> getImageBrands(@PathVariable String filename) {
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

    @GetMapping("/categories/{filename:.+}")
    public ResponseEntity<Resource> getImageCategory(@PathVariable String filename) {
        try {
            Path fileStorageLocation = Paths.get("src/main/resources/static/categories").toAbsolutePath().normalize();
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

    @GetMapping("/tags/{filename:.+}")
    public ResponseEntity<Resource> getImageTag(@PathVariable String filename) {
        try {
            Path fileStorageLocation = Paths.get("src/main/resources/static/tags").toAbsolutePath().normalize();
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
}
