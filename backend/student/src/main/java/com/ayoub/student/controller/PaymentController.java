package com.ayoub.student.controller;

import com.ayoub.student.dtos.PaymentDto;
import com.ayoub.student.entity.Payment;

import com.ayoub.student.entity.StatusPayment;
import com.ayoub.student.entity.TypePayment;
import com.ayoub.student.services.PaymentServiceImpl;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/payment")

public class PaymentController {
    private PaymentServiceImpl paymentService;


    public PaymentController(PaymentServiceImpl paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment createPayment(@RequestParam("file") MultipartFile file, PaymentDto paymentDto) throws IOException {
        return paymentService.createPayment(file,paymentDto);
    }

    @PutMapping(path = "/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment editePayment(@PathVariable Long id,@RequestParam MultipartFile file,PaymentDto paymentDto)throws Exception{
        return paymentService.editePayment(id,file,paymentDto);
    }

    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id)throws Exception{
        paymentService.deletePayment(id);
    }

    @DeleteMapping("/paymentStudent/{code}")
    public void deletePaymentByCode(@PathVariable String code)throws Exception{
       paymentService.deletePaymentByStudentCode(code);
    }
    @GetMapping()
    public List<Payment> getAllPayment(){
        return paymentService.getAllPayment();
    }

    @GetMapping("/student/{code}")
    public List<Payment> getPaymentByStudentCode(@PathVariable String code){
        return paymentService.getByStudentCode(code);
    }
    @GetMapping("/paymentByStatus/{status}")
    public List<Payment> getPaymentByStatus(@PathVariable StatusPayment status){
        return paymentService.getByStatus(status);
    }
    @GetMapping("/paymentByType/{type}")
    public List<Payment> getPaymentByType(@PathVariable TypePayment type){
        return paymentService.getByType(type);
    }

    @GetMapping(path = "/paymentFile/{id}",produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getPaymentFile(@PathVariable Long id) throws Exception {
        return paymentService.getPaymenntFile(id);
    }
    @GetMapping("/paymentById/{id}")
    public Payment getPaymentByType(@PathVariable Long id){
        return paymentService.getById(id);
    }

    @PutMapping(path = "/paymentStatus/{id}")
    public Payment editePaymentStatus(@PathVariable Long id,@RequestParam("statusPayment") StatusPayment statusPayment)throws Exception{
        return paymentService.editePaymentStatus(id,statusPayment);
    }


}
