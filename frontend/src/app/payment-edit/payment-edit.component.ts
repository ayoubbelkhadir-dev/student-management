import { ChangeDetectorRef, Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Payment, PaymentType } from '../model/student.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-edit',
  standalone: false,
  
  templateUrl: './payment-edit.component.html',
  styleUrl: './payment-edit.component.css'
})
export class PaymentEditComponent {
  formgroup! : FormGroup;
  payment! :Payment;
  typePayment :string[] =[];
  id! : any;
  isEdite : boolean=false;
  isSelect: boolean =false;
  file!:any;

  constructor(
    private paymentService:PaymentService,
    private fb : FormBuilder,
    private activate:ActivatedRoute,
    private cdr: ChangeDetectorRef
  ){}
  ngOnInit(){
    for(let item in PaymentType){
      let value = PaymentType[item];
      if(typeof value == 'string'){
        this.typePayment.push(value);
      }
    }
    this.formgroup = this.fb.group({
      date: this.fb.control(''),
      amount: this.fb.control(''),
      type: this.fb.control(''),
      status: this.fb.control(''),
      file: this.fb.control(''),
      filename: this.fb.control(''),
      codeStudent: this.fb.control(''),
    });
  
    this.id = this.activate.snapshot.params['id'];
    this.paymentService.getPaymentById(this.id).subscribe({
      next: (payment) => {
        this.payment = payment;
        this.paymentService.getFilePayment(this.id).subscribe({
          next: (file) => {
            this.file = file;
            const filename = this.payment?.file ? this.payment.file.split('/').pop() : '';
            this.formgroup.patchValue({
              date: new Date(this.payment.date),
              amount: this.payment.amount,
              type: this.payment.type,
              status: this.payment.status,
              file: this.file,
              filename: filename,
              codeStudent: this.payment.student?.code || '',
            });
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error retrieving file:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error retrieving payment:', err);
      }
    });
  }

  selectFile(event:any){
    this.isSelect=true;
    if(event.target.files.length > 0){
      let file = event.target.files[0];
      this.formgroup.patchValue({
        file : file,
        filename : file.name
      })
    }
  }

  editePayment(){
    let date = new Date(this.formgroup.value.date);
    let formatDate = date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    let formdata = new FormData();
    formdata.append("date",formatDate);
    formdata.append("amount",this.formgroup.value.amount);
    formdata.append("type",this.formgroup.value.type);
    formdata.append("status",this.formgroup.value.status);
    if(this.isSelect){
      formdata.append("file",this.formgroup.get('file')!.value);
    }else{
      formdata.append("file",this.file);
    }

    formdata.append("codeStudent",this.formgroup.value.codeStudent);
    this.paymentService.editePayment(this.id,formdata).subscribe({
      next : value =>{
        this.payment = value;
        this.isEdite = true;
      },
      error:err =>{
        console.log(err);
        this.isEdite = false;
      }
    })
  }
}
