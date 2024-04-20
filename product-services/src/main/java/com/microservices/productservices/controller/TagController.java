package com.microservices.productservices.controller;

import com.microservices.productservices.payload.request.TagRequest;
import com.microservices.productservices.payload.response.TagResponse;
import com.microservices.productservices.service.TagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/product-services/api/tags")
public class TagController {

    private final TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @PostMapping("/create")
    public ResponseEntity<TagResponse> createTag(@RequestBody TagRequest tagRequest) {
        TagResponse createdTag = tagService.create(tagRequest);
        return new ResponseEntity<>(createdTag, HttpStatus.CREATED);
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<TagResponse> getTagById(@PathVariable UUID id) {
        TagResponse tag = tagService.getById(id);
        if (tag != null) {
            return ResponseEntity.ok(tag);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<TagResponse>> getAllTags() {
        List<TagResponse> tags = tagService.getAll();
        return ResponseEntity.ok(tags);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TagResponse> updateTag(@RequestBody TagRequest tagRequest, @PathVariable UUID id) {
        TagResponse updatedTag = tagService.update(id, tagRequest);
        if (updatedTag != null) {
            return ResponseEntity.ok(updatedTag);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<TagResponse> deleteTag(@PathVariable UUID id) {
        TagResponse deletedTag = tagService.delete(id);
        if (deletedTag != null) {
            return ResponseEntity.ok(deletedTag);
        }
        return ResponseEntity.notFound().build();
    }
}
