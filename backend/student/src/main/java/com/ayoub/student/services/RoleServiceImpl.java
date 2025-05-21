package com.ayoub.student.services;

import com.ayoub.student.entity.AppRole;
import com.ayoub.student.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public AppRole createRole(AppRole appRole) {
        return roleRepository.save(appRole);
    }

    @Override
    public AppRole editeRole(long id, AppRole appRole) throws Exception {
        AppRole editeRole = roleRepository.findById(id);
        if(editeRole == null){
            throw new Exception("Role not found with id :"+id);
        }
        editeRole.setNameRole(appRole.getNameRole());
        return roleRepository.save(editeRole);
    }

    @Override
    public void deleteRole(long id) throws Exception {
        AppRole deleteRole = roleRepository.findById(id);
        if(deleteRole == null){
            throw new Exception("Role not found wiyh id :"+id);
        }
        roleRepository.delete(deleteRole);
    }

    @Override
    public List<AppRole> getAllRoles() {
        return roleRepository.findAll();
    }

}
