package com.microservices.productservices.payload.response;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CategoryResponse {

    private UUID id;

    private String name;

    @Lob
    private byte[] image;

    private Long productQuantity;

    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private UUID createdBy;

    private UUID updatedBy;

    private Integer status;
}
