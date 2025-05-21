package com.ayoub.student.repository;

import com.ayoub.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student,Long> {
    public Student findByCode(String code);
    public List<Student> findByProgrameId(String programeId);
}
