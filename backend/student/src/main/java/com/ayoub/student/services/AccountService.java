package com.ayoub.student.services;

import com.ayoub.student.dtos.UserDto;
import com.ayoub.student.entity.AppRole;
import com.ayoub.student.entity.AppUser;

import java.util.List;
import java.util.Map;

public interface AccountService {
    public AppUser createUser(UserDto userDto);
    public AppUser editeUser(long id,AppUser appuser) throws Exception;
    public void deleteUser(long id) throws Exception;
    public AppUser addUserToRole(Long idUser , Long idRole) throws Exception;
    public AppUser findByUsername(String username);
    public List<AppUser> getAllUsers();
    public AppUser getUserById(Long id);
}
