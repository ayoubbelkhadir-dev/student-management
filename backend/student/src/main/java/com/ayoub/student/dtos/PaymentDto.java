package com.ayoub.student.dtos;

import com.ayoub.student.entity.StatusPayment;
import com.ayoub.student.entity.Student;
import com.ayoub.student.entity.TypePayment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {
    private LocalDate date;
    private double amount;
    private TypePayment type;
    private StatusPayment status;
    private String codeStudent;
}
