package com.microservices.productservices.payload.request;

import java.util.UUID;

import jakarta.persistence.ElementCollection;
import lombok.Builder;
import lombok.Data;
import java.util.List; 

@Builder
@Data
public class ProductFeedbackRequest {

    private UUID orderItemId;

    private UUID productId;

    private Integer evaluate;

    private String description;

    private String detail;

    private UUID createdBy;

    private UUID updatedBy;

    @ElementCollection
    private List<byte[]> images;
}
