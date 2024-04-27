package com.microservices.productservices.payload.request;

import java.util.UUID;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TagRequest {

    private String name;

    private UUID createdBy;

    private UUID updatedBy;
}
