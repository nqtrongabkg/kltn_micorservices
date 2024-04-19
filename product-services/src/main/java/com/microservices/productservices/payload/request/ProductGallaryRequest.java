package com.microservices.productservices.payload.request;

import java.util.UUID;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductGallaryRequest {

    private UUID productId;

    @Lob
    private byte[] image;

    private UUID createdBy;

    private UUID updatedBy;
}
