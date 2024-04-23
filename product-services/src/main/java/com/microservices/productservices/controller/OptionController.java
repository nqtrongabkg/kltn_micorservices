package com.microservices.productservices.controller;

import com.microservices.productservices.payload.request.OptionRequest;
import com.microservices.productservices.payload.response.OptionResponse;
import com.microservices.productservices.service.OptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("product-services/api/options")
@CrossOrigin(origins = { "http://localhost:3000" })
public class OptionController {

    private final OptionService optionService;

    public OptionController(OptionService optionService) {
        this.optionService = optionService;
    }

    @PostMapping("/create")
    public ResponseEntity<OptionResponse> createOption(@RequestBody OptionRequest optionRequest) {
        OptionResponse createdOption = optionService.create(optionRequest);
        return new ResponseEntity<>(createdOption, HttpStatus.CREATED);
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<OptionResponse> getOptionById(@PathVariable UUID id) {
        OptionResponse option = optionService.getById(id);
        if (option != null) {
            return ResponseEntity.ok(option);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<OptionResponse>> getAllOptions() {
        List<OptionResponse> options = optionService.getAll();
        return ResponseEntity.ok(options);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<OptionResponse> updateOption(@RequestBody OptionRequest optionRequest, @PathVariable UUID id) {
        OptionResponse updatedOption = optionService.update(id, optionRequest);
        if (updatedOption != null) {
            return ResponseEntity.ok(updatedOption);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<OptionResponse> deleteOption(@PathVariable UUID id) {
        OptionResponse deletedOption = optionService.delete(id);
        if (deletedOption != null) {
            return ResponseEntity.ok(deletedOption);
        }
        return ResponseEntity.notFound().build();
    }
}
