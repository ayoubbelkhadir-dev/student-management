package com.ayoub.student.services;

import com.ayoub.student.dtos.StudentDto;
import com.ayoub.student.entity.Student;

import java.util.List;

public interface StudentService {
    public Student createStudent(StudentDto studentDto);
    public Student editeStudent(Long id,StudentDto studentDto) throws Exception;
    public void delteStudent(Long id) throws Exception;
    public List<Student> getAllStudents();
    public Student getStudentByCode(String code) throws Exception;
    public List<Student> getByProgrameId(String programeId);
}
