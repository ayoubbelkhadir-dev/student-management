package com.ayoub.student.repository;

import com.ayoub.student.entity.Payment;
import com.ayoub.student.entity.StatusPayment;
import com.ayoub.student.entity.TypePayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment,Long> {
    public List<Payment> findByStudentCode(String code);
    public List<Payment> findByStatus(StatusPayment statusPayment);
    public List<Payment> findByType(TypePayment typePayment);
    void deleteByStudent_Code(String codeStudent);
}
