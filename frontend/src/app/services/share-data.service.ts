import { Injectable } from '@angular/core';
import { Payment,Student } from '../model/student.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private dataPaymentSource = new BehaviorSubject<Array<Payment>>([]);
  private dataStudentSource = new BehaviorSubject<Array<Student>>([]);

  currentPayments = this.dataPaymentSource.asObservable();
  currentStudents = this.dataStudentSource.asObservable();

  constructor() {}

  sharePayment(data: Array<Payment>) {
    this.dataPaymentSource.next(data);
  }

  shareStudent(data: Array<Student>) {
    this.dataStudentSource.next(data);
  }
}
