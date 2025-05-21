import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { Payment, PaymentStatus } from '../model/student.model';

@Component({
  selector: 'app-view-payment',
  standalone: false,
  
  templateUrl: './view-payment.component.html',
  styleUrl: './view-payment.component.css'
})
export class ViewPaymentComponent {
  id!:any;
  payment!:Payment;
  pdfSrc! :any;
  isAcctepted : boolean =false;
  isRejected : boolean = false;
  isCreaed:boolean = false;
  status!:string;
  constructor(
    private r:ActivatedRoute,
    private paymentService :PaymentService,
    private cdr :ChangeDetectorRef

  ){}
  ngOnInit(){
    this.id = this.r.snapshot.params['id'];
    this.paymentService.getPaymentById(this.id).subscribe({
      next : val => {
        console.log("in payemtn good")
        this.payment = val;
        this.status = this.payment.status.toString().trim().toUpperCase();
        this.updateStatusFlags();
        
        this.paymentService.getFilePayment(this.id).subscribe({
          next : val=>{
            this.pdfSrc =window.URL.createObjectURL(val);
          },
          error :err =>{
            console.log(err);
          }
        });
        this.cdr.detectChanges();
      },
      error : err => console.log(err)
    });
    
  }
  paymentAccepted(){
    this.paymentService.editStatusPayment(this.id,"VALIDATED").subscribe({
      next :val =>{
        this.payment =val;
        this.isAcctepted = true;
        this.isCreaed = false;
        this.isRejected = false;
      },
      error : err => console.log(err)
    });
  }
  paymentRejected(){
    this.paymentService.editStatusPayment(this.id,"REJECTED").subscribe({
      next :val =>{
        this.payment =val;
        this.isRejected = true;
        this.isAcctepted = false;
        this.isCreaed = false;
      },
      error : err => console.log(err)
    });
  }

  private updateStatusFlags(): void {
    if (this.status === "CREATED") {
      this.isCreaed = true;
      this.isRejected = false;
      this.isAcctepted = false;
    } else if (this.status === "VALIDATED") {
      this.isCreaed = false;
      this.isAcctepted = true;
      this.isRejected = false;
    } else if (this.status === "REJECTED") {
      this.isCreaed = false;
      this.isRejected = true;
      this.isAcctepted = false;
    }
  }

}
