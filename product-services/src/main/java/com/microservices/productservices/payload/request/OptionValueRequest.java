package com.microservices.productservices.payload.request;

import java.util.UUID;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class OptionValueRequest {

    private UUID optionId;

    private Integer value;

    private UUID createdBy;
}
