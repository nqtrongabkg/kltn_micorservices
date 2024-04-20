package com.microservices.productservices.payload.response;

import java.util.UUID;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class FeedbackGallaryResponse {

    private UUID id;

    private UUID feedbackId;

    @Lob
    private byte[] image;
}
