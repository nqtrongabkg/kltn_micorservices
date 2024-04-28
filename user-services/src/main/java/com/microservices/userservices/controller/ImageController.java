package com.microservices.userservices.controller;

import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

import com.microservices.userservices.payload.request.ImageRequest;
import com.microservices.userservices.service.UserService;

import java.nio.file.Paths;
// import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;

import java.nio.file.Path;

@RestController
@RequestMapping("image-service/images")
@CrossOrigin(origins = { "http://localhost:3000" })
public class ImageController {

    private final UserService userService;
    public ImageController(UserService userService) {
        this.userService = userService;
    }

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

    // @PostMapping("/save/{id}")
    // public ResponseEntity<String> saveImage(@PathVariable UUID id, 
    // @RequestPart("path") String path,
    //     @RequestPart("image") MultipartFile image) {
    //         userService.saveImage(id,path, image);
    //         return ResponseEntity.ok("Image uploaded successfully");
    // }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteImage(@RequestBody ImageRequest request) {
        try {
            userService.deleteImage(request.getPath(), request.getFilename());
            return ResponseEntity.ok("Image deleted successfully");
        } catch (Exception e) {
            throw new RuntimeException("Error deleting the file: " + e.getMessage());
        }
    }
}
