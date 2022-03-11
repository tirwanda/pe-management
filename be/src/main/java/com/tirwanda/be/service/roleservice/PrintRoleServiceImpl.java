package com.tirwanda.be.service.roleservice;

import com.tirwanda.be.entity.Role;
import com.tirwanda.be.exception.ResourceNotFoundException;
import com.tirwanda.be.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PrintRoleServiceImpl implements PrintRoleService{

    private final RoleRepository roleRepository;

    @Override
    public Role getRole(Long roleId) {
        return roleRepository.findById(roleId).orElseThrow(() -> new ResourceNotFoundException("Role is not found"));
    }

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }
}
