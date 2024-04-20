package com.microservices.productservices.payload.request;

import java.util.UUID;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class FeedbackGallaryRequest {

    private UUID feedbackId;

    @Lob
    private byte[] image;
}
