package com.microservices.productservices.payload.response;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BrandResponse {

    private UUID id;

    private String name;

    private String description;

    @Lob
    private byte[] logo;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private UUID createdBy;

    private UUID updatedBy;

    private Integer status;

    private UserResponse User;
}
