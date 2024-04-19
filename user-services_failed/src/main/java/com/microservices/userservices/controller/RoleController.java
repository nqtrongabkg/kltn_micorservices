package com.microservices.userservices.controller;

import com.microservices.userservices.entity.Role;
import com.microservices.userservices.request.RoleRequest;
import com.microservices.userservices.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user-services/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/create")
    public Role createRole(@RequestBody RoleRequest roleRequest) {
        return roleService.createRole(roleRequest);
    }

    @GetMapping("/get-by-id/{roleId}")
    public Role getRoleById(@PathVariable UUID roleId) {
        return roleService.getRoleById(roleId);
    }

    @GetMapping("/get-all")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @PutMapping("/update/{roleId}")
    public Role updateRole(@PathVariable UUID roleId, @RequestBody RoleRequest roleRequest) {
        return roleService.updateRole(roleId, roleRequest);
    }

    @DeleteMapping("/delete/{roleId}")
    public void deleteRoleById(@PathVariable UUID roleId) {
        roleService.deleteRoleById(roleId);
    }
}