package com.microservices.productservices.payload.request;

import java.util.UUID;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TagRequest {

    private String name;

    @Lob
    private byte[] icon;

    private UUID createdBy;

    private UUID updatedBy;
}
