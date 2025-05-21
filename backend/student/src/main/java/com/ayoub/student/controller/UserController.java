package com.ayoub.student.controller;

import com.ayoub.student.dtos.UserDto;
import com.ayoub.student.entity.AppRole;
import com.ayoub.student.entity.AppUser;
import com.ayoub.student.services.AccountServiceImpl;
import com.ayoub.student.services.RoleServiceImpl;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/users")

public class UserController {
    private AccountServiceImpl accountService;
    private RoleServiceImpl roleService;

    public UserController(AccountServiceImpl accountService, RoleServiceImpl roleService) {
        this.accountService = accountService;
        this.roleService = roleService;
    }

    @PostMapping()
    public AppUser createUser(UserDto appUser){
        return accountService.createUser(appUser);
    }
    @GetMapping()
    public List<AppUser> getAllUsers(){
        return accountService.getAllUsers();
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable long id) throws Exception {
        accountService.deleteUser(id);
    }
    @PutMapping("/{id}")
    public AppUser editeUser(@RequestBody AppUser appUser,@PathVariable Long id) throws Exception {
        return accountService.editeUser(id,appUser);
    }
    @PostMapping("/roleToUser/{idUser}/{idRole}")
    public AppUser addRoleToUser(@PathVariable("idUser") Long idUser,@PathVariable("idRole") Long idRole) throws Exception {
        return accountService.addUserToRole(idUser, idRole);
    }
    @PostMapping("/roles")
    public AppRole createRole(AppRole appRole){
        return roleService.createRole(appRole);
    }

    @DeleteMapping("/roles/{id}")
    public void deleteRole(@PathVariable long id) throws Exception {
        roleService.deleteRole(id);
    }
    @PutMapping("/roles/{id}")
    public AppRole editeRole(@RequestBody AppRole appRole,@PathVariable Long id) throws Exception {
        return roleService.editeRole(id,appRole);
    }
    @GetMapping("/roles")
    public List<AppRole> getAllRoles(){
        return roleService.getAllRoles();
    }

    @GetMapping("/userById/{id}")
    public AppUser getUserById(@PathVariable long id){
        return accountService.getUserById(id);
    }


}
