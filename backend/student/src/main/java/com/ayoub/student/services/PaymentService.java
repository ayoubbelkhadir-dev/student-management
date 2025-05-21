package com.ayoub.student.services;



import com.ayoub.student.dtos.PaymentDto;
import com.ayoub.student.entity.Payment;
import com.ayoub.student.entity.StatusPayment;
import com.ayoub.student.entity.TypePayment;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;

public interface PaymentService {
    public Payment createPayment(MultipartFile file, PaymentDto paymentDto) throws IOException;
    public Payment editePayment(Long id, MultipartFile file, PaymentDto paymentDto) throws Exception;
    public void deletePayment(Long id) throws Exception;
    public List<Payment> getAllPayment();
    public List<Payment> getByStudentCode(String code);
    public List<Payment> getByStatus(StatusPayment statusPayment);
    public List<Payment> getByType(TypePayment typePayment);
    public byte[] getPaymenntFile(Long id) throws Exception;
    public Path saveFile(MultipartFile file, String code) throws IOException;
    public void deletePaymentByStudentCode(String code);
    public Payment getById(Long id);
    public Payment editePaymentStatus(Long id,StatusPayment statusPayment)throws Exception;
}
