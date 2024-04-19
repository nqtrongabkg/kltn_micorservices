package com.microservices.userservices.request;

import java.time.LocalDateTime;
import java.util.UUID;

import com.microservices.userservices.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {

    private Role role;

    private String name;

    private String userName;

    private String email;

    private String password;

    private String phone;

    private byte[] avarta;
    
    private String address;

    private LocalDateTime birthday;

    private UUID createdBy;

    private UUID updatedBy;

    private Integer status;
}
