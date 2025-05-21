package com.ayoub.student.controller;

import com.ayoub.student.dtos.StudentDto;
import com.ayoub.student.entity.Student;
import com.ayoub.student.services.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    private StudentServiceImpl studentService;

    public StudentController(StudentServiceImpl studentService) {
        this.studentService = studentService;
    }
    @PostMapping()
    public Student createStudent(StudentDto studentDto){
        return studentService.createStudent(studentDto);
    }

    @PutMapping("/{id}")
    public Student editeStudent(@PathVariable Long id, StudentDto studentDto)throws Exception{
        return studentService.editeStudent(id,studentDto);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id)throws Exception{
        studentService.delteStudent(id);
    }
    @GetMapping()
    public List<Student> getAllStudent(){
        return studentService.getAllStudents();
    }

    @GetMapping("/studentCode/{code}")
    public Student getStudentByCode(@PathVariable String code) throws Exception {
        return studentService.getStudentByCode(code);
    }
    @GetMapping("/studentProgrameId/{programId}")
    public List<Student> getStudentByProgrameId(@PathVariable String programId) {
        return studentService.getByProgrameId(programId);
    }


}
