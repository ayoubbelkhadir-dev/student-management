package com.ayoub.student.services;

import com.ayoub.student.dtos.UserDto;
import com.ayoub.student.entity.AppRole;
import com.ayoub.student.entity.AppUser;
import com.ayoub.student.repository.AccountRepository;
import com.ayoub.student.repository.RoleRepository;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class AccountServiceImpl implements AccountService {
    private AccountRepository accountRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    public AccountServiceImpl(AccountRepository accountRepository, RoleRepository roleRepository,@Lazy PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;

        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AppUser createUser(UserDto userDto) {
        AppUser appuser= AppUser.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword())).build();
        return accountRepository.save(appuser);
    }

    @Override
    public AppUser editeUser(long id, AppUser appuser) throws Exception {
        AppUser userEdite = accountRepository.findById(id);
        if(userEdite ==  null){
            throw new Exception("User not found with id :"+id);
        }
        if(appuser.getUsername() != null){
            userEdite.setUsername(appuser.getUsername());
        }
        if(appuser.getAvatar() != null){
            userEdite.setAvatar(appuser.getAvatar());
        }
        if(appuser.getRoles() != null){
            userEdite.setRoles(appuser.getRoles());
        }

        return accountRepository.save(userEdite);
    }

    @Override
    public void deleteUser(long id) throws Exception {
        AppUser deleteUser = accountRepository.findById(id);
        if(deleteUser ==  null){
            throw new Exception("User not found with id :"+id);
        }
        accountRepository.delete(deleteUser);
    }

    @Override
    public AppUser addUserToRole(Long idUser , Long idRole) throws Exception {
        AppRole appRole = roleRepository.findById(idRole).get();
        AppUser appuser = accountRepository.findById(idUser).get();
        String roleName = appRole.getNameRole();
        if(roleName == null){
            throw new Exception("Role name is empty");
        }
        for (AppRole role : appuser.getRoles()){
            if(role.getNameRole()==roleName){
                throw new Exception("Role name is already");
            }
        }
        appuser.getRoles().add(appRole);
        return accountRepository.save(appuser);
    }
    @Transactional
    @Override
    public AppUser findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }

    @Override
    public List<AppUser> getAllUsers() {
        return accountRepository.findAll();
    }

    @Override
    public AppUser getUserById(Long id) {
        return accountRepository.findById(id).get();
    }

}
