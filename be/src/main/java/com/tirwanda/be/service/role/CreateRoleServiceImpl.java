package com.tirwanda.be.service.role;

import com.tirwanda.be.entity.Role;
import com.tirwanda.be.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CreateRoleServiceImpl implements CreateRoleService{

    private final RoleRepository roleRepository;

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new role {} to the Database", role.getRoleName());
        return roleRepository.save(role);
    }

    @Override
    public void addUserToRole(String username, String roleName) {

    }
}
