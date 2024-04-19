package com.microservices.userservices.service;

import com.microservices.userservices.config.exception.NotFoundException;
import com.microservices.userservices.entity.Role;
import com.microservices.userservices.repository.RoleRepository;
import com.microservices.userservices.request.RoleRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Role createRole(RoleRequest roleRequest) {
        Role role = new Role();
        BeanUtils.copyProperties(roleRequest, role);
        return roleRepository.save(role);
    }

    public Role getRoleById(UUID roleId) {
        return roleRepository.findById(roleId)
                             .orElseThrow(() -> new NotFoundException("Role not found with id: " + roleId));
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role updateRole(UUID roleId, RoleRequest roleRequest) {
        Role existingRole = getRoleById(roleId);
        BeanUtils.copyProperties(roleRequest, existingRole);
        return roleRepository.save(existingRole);
    }

    public void deleteRoleById(UUID roleId) {
        roleRepository.deleteById(roleId);
    }
}
