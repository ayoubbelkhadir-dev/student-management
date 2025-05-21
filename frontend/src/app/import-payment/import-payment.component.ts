import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { Payment, PaymentStatus, PaymentType, Student } from '../model/student.model';
import { StudentService } from '../services/student.service';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-import-payment',
  standalone: false,
  
  templateUrl: './import-payment.component.html',
  styleUrl: './import-payment.component.css'
})
export class ImportPaymentComponent {
  formGroup! : FormGroup;
  payment! : Payment;
  students! : Array<Student>;
  typePayment :string[] =[];
  statusPayment = PaymentStatus["0"];
  listeStudent! : boolean;
  isSave! : boolean;
  constructor(private fb : FormBuilder,private payementService : PaymentService,private studentSerice:StudentService,private shareData : ShareDataService){}

  ngOnInit(){
    this.isSave = false;
    this.listeStudent= false;
    for(let item in PaymentType){
      let value = PaymentType[item];
      if(typeof value == 'string'){
        this.typePayment.push(value);
      }
    }
    this.formGroup = this.fb.group({
      date : this.fb.control(''),
      amount : this.fb.control(''),
      type : this.fb.control(''),
      status : this.fb.control(this.statusPayment),
      file : this.fb.control(''),
      filename : this.fb.control(''),
      codeStudent : this.fb.control(''),
    })
  }
  savePayment(){
    let date = new Date(this.formGroup.value.date);
    let formatDate = date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    let formdata = new FormData();
    formdata.append("date",formatDate);
    formdata.append("amount",this.formGroup.value.amount);
    formdata.append("type",this.formGroup.value.type);
    formdata.append("status",this.formGroup.value.status);
    formdata.append("file",this.formGroup.get('file')!.value);
    formdata.append("codeStudent",this.formGroup.value.codeStudent);
    this.payementService.savePayment(formdata).subscribe({
      next : value =>{
        this.payment = value;
        this.isSave = true;
        this.listeStudent= false;
      },
      error:err =>{
        console.log(err);
        this.isSave = false;
        this.listeStudent= false;
      }
    })
  }
  selectFile(event : any){
    if(event.target.files.length > 0){
      let file = event.target.files[0];
      this.formGroup.patchValue({
        file : file,
        filename : file.name
      })
    }
  }
  isListStudent(){

    this.studentSerice.getAllStudent().subscribe({
      next : data =>{
        this.students = data;
        this.listeStudent = true;
        this.isSave = false;
      },
      error : err =>{
        this.listeStudent = true;
        console.log(err);
      }

    })
  }
  selectStudent(student:any){
    this.formGroup.patchValue({
      codeStudent : student.code
    })
  }
}
