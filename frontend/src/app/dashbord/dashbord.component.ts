import { Component } from '@angular/core';
import { ShareDataService } from '../services/share-data.service';
import { Payment, Student } from '../model/student.model';

@Component({
  selector: 'app-dashbord',
  standalone: false,
  
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {
  payments! : Array<Payment>
  students! : Array<Student>
  lastStudent! :Student
  lastPayment! :Payment
  constructor(private shareData:ShareDataService){}
  ngOnInit(){
    this.shareData.currentPayments.subscribe((data) => {
      this.payments = data;
    });

    this.shareData.currentStudents.subscribe((data) => {
      this.students = data;
    });

    this.lastPayment = this.payments.slice(-1)[0];;
    this.lastStudent = this.students.slice(-1)[0];;
  }
}
