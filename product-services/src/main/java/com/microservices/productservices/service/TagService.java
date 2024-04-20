package com.microservices.productservices.service;

import com.microservices.productservices.payload.request.TagRequest;
import com.microservices.productservices.payload.response.TagResponse;

import java.util.List;
import java.util.UUID;

public interface TagService {

    TagResponse create(TagRequest tagRequest);

    TagResponse getById(UUID id);

    List<TagResponse> getAll();

    TagResponse update(UUID id, TagRequest tagRequest);

    TagResponse delete(UUID id);
}
