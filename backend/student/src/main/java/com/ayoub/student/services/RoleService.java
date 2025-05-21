package com.ayoub.student.services;

import com.ayoub.student.entity.AppRole;
import com.ayoub.student.entity.AppUser;

import java.util.List;

public interface RoleService {
    public AppRole createRole(AppRole appRole);
    public AppRole editeRole(long id,AppRole appRole) throws Exception;
    public void deleteRole(long id) throws Exception;
    public List<AppRole> getAllRoles();

}
