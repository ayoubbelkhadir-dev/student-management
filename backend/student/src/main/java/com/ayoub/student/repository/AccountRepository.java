package com.ayoub.student.repository;

import com.ayoub.student.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<AppUser,Long> {
    public AppUser findByUsername(String username);
    public AppUser findById(long id);}
