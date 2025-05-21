import { Component, ViewChild,Inject } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../model/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from '../services/payment.service';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { ShareDataService } from '../services/share-data.service';
@Component({
  selector: 'app-student',
  standalone: false,
  
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

  displayColumns! : Array<String>;
  student! : Array<Student>;
  datasource : any;
  studentDeleted! :Student;
  roles : any;

  constructor(
    private studentService : StudentService,
    private router : Router,
    public authService:AuthService,
    private dialog: MatDialog,
    private paymentService : PaymentService,
    private shareData : ShareDataService

  ){}
  @ViewChild(MatPaginator)  matPagintor! :MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;
  ngOnInit(){
    this.roles = localStorage.getItem("roles")
      if(this.roles != null ){
        if(this.roles.includes('ADMIN')){
        this.displayColumns = ["id","firstname","lastname","code","programeId","edit","delete"];
      }else{
        this.displayColumns = ["id","firstname","lastname","code","programeId"];
      }
    }
    this.studentService.getAllStudent().subscribe({
      next : value =>{
        this.student = value;
        this.datasource = new MatTableDataSource(value);
        this.datasource.paginator = this.matPagintor;
        this.datasource.sort = this.matSort;
        this.shareData.shareStudent(this.student);
      },
      error: err =>{
        console.log(err);
      },
    })
  }

  editStudent(student :Student){
    this.router.navigateByUrl(`admin/editStudent/${student.code}`);
  }

  openConfirmDialog(studentDeleted : any): void {
    this.studentDeleted =  studentDeleted;
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete the student and associated payments?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Suppression confirmée');
        let index = this.student.indexOf(this.studentDeleted);
        this.paymentService.deletePayemntByCode(this.studentDeleted.code).subscribe({
          next : val => {
            console.log("the payments student is deleted")
            this.studentService.deleteStudent(this.studentDeleted.id).subscribe({
              next : val => {
                console.log(`${this.studentDeleted.code} the student is deleted`)
                this.student.splice(index,1);
                this.datasource = new MatTableDataSource(this.student);
                this.shareData.shareStudent(this.student);
              },
              error : err => console.log(err)
            });
          },
          error: err =>{
            console.log(err);
          }
        })
      } else {
        console.log('Suppression annulée');
      }
    });
  }

}
