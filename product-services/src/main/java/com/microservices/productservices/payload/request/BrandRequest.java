package com.microservices.productservices.payload.request;

import java.util.UUID;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BrandRequest {

    private String name;

    private String description;

    @Lob
    private byte[] logo;

    private UUID createdBy;

    private Integer status;
}
