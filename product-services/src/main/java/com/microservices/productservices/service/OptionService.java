package com.microservices.productservices.service;

import com.microservices.productservices.payload.request.OptionRequest;
import com.microservices.productservices.payload.response.OptionResponse;

import java.util.List;
import java.util.UUID;

public interface OptionService {

    OptionResponse create(OptionRequest optionRequest);

    OptionResponse getById(UUID id);

    List<OptionResponse> getAll();

    OptionResponse update(UUID id, OptionRequest optionRequest);

    OptionResponse delete(UUID id);
}
