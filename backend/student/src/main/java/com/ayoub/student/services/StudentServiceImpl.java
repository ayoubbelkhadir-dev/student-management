package com.ayoub.student.services;

import com.ayoub.student.dtos.StudentDto;
import com.ayoub.student.entity.Student;
import com.ayoub.student.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StudentServiceImpl implements StudentService {
    private StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student createStudent(StudentDto studentDto) {
        Student student = Student.builder()
                .firstname(studentDto.getFirstname())
                .lastname(studentDto.getLastname())
                .code(studentDto.getCode())
                .programeId(studentDto.getProgrameId())
                .photo(studentDto.getPhoto())
                .build();
        return studentRepository.save(student);
    }

    @Override
    public Student editeStudent(Long id,StudentDto studentDto) throws Exception {
        Student studentEdit = studentRepository.findById(id).orElse(null);
        if(studentEdit == null){
            throw new Exception("Student not found with id "+id);
        }
        studentEdit.setFirstname(studentDto.getFirstname());
        studentEdit.setLastname(studentDto.getLastname());
        studentEdit.setProgrameId(studentDto.getProgrameId());
        studentEdit.setPhoto(studentDto.getPhoto());
        return studentRepository.save(studentEdit);
    }

    @Override
    public void delteStudent(Long id) throws Exception {
        Student studentDelete = studentRepository.findById(id).orElse(null);
        if(studentDelete == null){
            throw new Exception("Student not found with id "+id);
        }
        studentRepository.delete(studentDelete);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentByCode(String code) throws Exception {
        if(studentRepository.findByCode(code) == null){
            System.out.println("Student not found with  code "+code);
            return null;
        }
        return studentRepository.findByCode(code);
    }

    @Override
    public List<Student> getByProgrameId(String programeId) {
        return studentRepository.findByProgrameId(programeId);
    }
}
