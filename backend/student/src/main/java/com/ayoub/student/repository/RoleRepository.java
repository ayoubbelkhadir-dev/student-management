package com.ayoub.student.repository;

import com.ayoub.student.entity.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<AppRole,Long> {
    public AppRole findById(long id);
}
