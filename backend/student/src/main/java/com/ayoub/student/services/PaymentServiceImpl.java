package com.ayoub.student.services;

import com.ayoub.student.dtos.PaymentDto;
import com.ayoub.student.entity.Payment;

import com.ayoub.student.entity.StatusPayment;
import com.ayoub.student.entity.Student;
import com.ayoub.student.entity.TypePayment;
import com.ayoub.student.repository.PaymentRepository;
import com.ayoub.student.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
@Service
public class PaymentServiceImpl implements PaymentService {
    private PaymentRepository paymentRepository;
    private StudentRepository studentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository, StudentRepository studentRepository) {
        this.paymentRepository = paymentRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public Payment createPayment(MultipartFile file, PaymentDto paymentDto) throws IOException {
        Path filePath = saveFile(file,paymentDto.getCodeStudent());

        Student student = studentRepository.findByCode(paymentDto.getCodeStudent());
        Payment payment = Payment.builder()
                .date(paymentDto.getDate())
                .amount(paymentDto.getAmount())
                .type(paymentDto.getType())
                .status(paymentDto.getStatus())
                .student(student)
                .file(filePath.toUri().toString()).build();

        return paymentRepository.save(payment);
    }

    @Override
    public Payment editePayment(Long id, MultipartFile file, PaymentDto paymentDto) throws Exception {
        Payment paymentEdite = paymentRepository.findById(id).orElse(null);
        if(paymentEdite == null){
            throw new Exception("Student not found with id "+id);
        }

        Path filePath = saveFile(file,paymentDto.getCodeStudent());
        Student student = studentRepository.findByCode(paymentDto.getCodeStudent());

        paymentEdite.setDate(paymentDto.getDate());
        paymentEdite.setAmount(paymentDto.getAmount());
        paymentEdite.setStatus(paymentDto.getStatus());
        paymentEdite.setType(paymentDto.getType());
        paymentEdite.setFile(filePath.toUri().toString());

        return paymentRepository.save(paymentEdite);
    }

    @Override
    public void deletePayment(Long id) throws Exception {
        Payment paymentDelete = paymentRepository.findById(id).orElse(null);
        if(paymentDelete == null){
            throw new Exception("Student not found with id "+id);
        }
        paymentRepository.delete(paymentDelete);
    }

    @Override
    public List<Payment> getAllPayment() {
        return paymentRepository.findAll();
    }

    @Override
    public List<Payment> getByStudentCode(String code) {

        return paymentRepository.findByStudentCode(code);
    }

    @Override
    public List<Payment> getByStatus(StatusPayment statusPayment) {
        return paymentRepository.findByStatus(statusPayment);
    }

    @Override
    public List<Payment> getByType(TypePayment typePayment) {
        return paymentRepository.findByType(typePayment);
    }

    @Override
    public byte[] getPaymenntFile(Long id) throws Exception {
        Payment payment = paymentRepository.findById(id).orElse(null);
        if(payment == null){
            throw new Exception("payment not found with id "+id);
        }
        return Files.readAllBytes(Path.of(URI.create(payment.getFile())));
    }
    @Override
    public Path saveFile(MultipartFile file,String code) throws IOException {
        Path folderPath = Paths.get(System.getProperty("user.home"),"enset-data","payements");
        if(!Files.exists(folderPath)){
            Files.createDirectories(folderPath);
        }
        String fileName = System.currentTimeMillis() + ".payment." +code;
        Path filePath = Paths.get(System.getProperty("user.home"),"enset-data","payements",fileName+".pdf");
        Files.copy(file.getInputStream(),filePath);

        return filePath;
    }
    @Transactional
    @Override
    public void deletePaymentByStudentCode(String code) {
       this.paymentRepository.deleteByStudent_Code(code);
    }

    @Override
    public Payment getById(Long id) {
        return paymentRepository.findById(id).get();
    }

    @Override
    public Payment editePaymentStatus(Long id,StatusPayment statusPayment) throws Exception {
        Payment paymentEdite = paymentRepository.findById(id).orElse(null);
        if(paymentEdite == null){
            throw new Exception("Student not found with id "+id);
        }
        paymentEdite.setStatus(statusPayment);
        return paymentRepository.save(paymentEdite);

    }
}
