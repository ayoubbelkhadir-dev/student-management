import { Component, ViewChild } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Payment } from '../model/student.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-payment',
  standalone: false,
  
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  payments! : Array<Payment>;
  datasource : any;
  displayColumns! : Array<String>;;

  constructor(private auth:AuthService,private paymentService : PaymentService,private router:Router,private shareData : ShareDataService){}

  @ViewChild(MatPaginator) paginator! : MatPaginator ;
  @ViewChild(MatSort) sort! : MatSort;  

  ngOnInit(){
    const roles = localStorage.getItem("roles")
    if(roles != null ){
      if(roles.includes('ADMIN')){
        this.displayColumns =["id","date","amount","type","status","firstname","edit","delete","payment"];
      }else{
        this.displayColumns =["id","date","amount","type","status","firstname"];
      }
    }
    this.paymentService.getAllPayment().subscribe({
      next : data => {
        this.payments= data;
        this.datasource = new MatTableDataSource(data);
        this.shareData.sharePayment(this.payments);
        this.datasource.sortingDataAccessor = (item:any, property:any) => {
          switch (property) {
            case 'firstname':
              return item.student?.firstname?.toLowerCase() || ''; 
            default:
              return item[property] ?? '';
          }
        };
        
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;

      },
      error : err => console.error(err)
    
    })
  }
  editePayment(payment:any){
    this.router.navigateByUrl(`admin/editePayment/${payment.id}`);
  }
  deletePayment(payment:any){
    let index = this.payments.indexOf(payment);
    this.paymentService.deletePayment(payment.id).subscribe({
      next : val =>{
        this.payments.splice(index,1);
        this.datasource = new MatTableDataSource(this.payments);
        this.shareData.sharePayment(this.payments);
      }
    })
  }
  viewPayement(payment:any){
    this.router.navigateByUrl(`admin/viewPayment/${payment.id}`)
  }

}
