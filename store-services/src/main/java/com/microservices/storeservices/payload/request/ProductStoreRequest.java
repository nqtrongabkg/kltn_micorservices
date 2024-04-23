package com.microservices.storeservices.payload.request;

import java.util.UUID;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductStoreRequest {

    private UUID productId;

    private Integer quantity;

    private Integer soldQuantity;

    private Double price;

    private String description;

    private UUID createdBy;

    private UUID updatedBy;
}

