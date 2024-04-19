package com.microservices.userservices.request;

import com.microservices.userservices.entity.UserCredential;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationRequest {

    private UserCredential user;

    private String description;

    private String detail;

    private int statusOfSee;

    private String linkTo;
}
