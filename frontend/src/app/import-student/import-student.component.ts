import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Student } from '../model/student.model';

@Component({
  selector: 'app-import-student',
  standalone: false,
  
  templateUrl: './import-student.component.html',
  styleUrl: './import-student.component.css'
})
export class ImportStudentComponent {
  formGroup! : FormGroup;
  student! : Student;
  studentcode! : Student;
  isSave! : boolean;
  isExsit! : boolean;
  constructor(private studentService:StudentService,private fb:FormBuilder){}

  ngOnInit(){
    this.formGroup = this.fb.group({
      firstname : this.fb.control(""),
      lastname : this.fb.control(""),
      code : this.fb.control(""),
      programeId : this.fb.control(""),
      photo : this.fb.control(""),
    })
  }
  saveStudent(){
    let formData = new FormData();
    formData.set("firstname",this.formGroup.value.firstname);
    formData.set("lastname",this.formGroup.value.lastname);
    formData.set("code",this.formGroup.value.code);
    formData.set("programeId",this.formGroup.value.programeId);
    formData.set("photo",this.formGroup.value.photo);
    this.studentService.getStudentByCode(this.formGroup.value.code).subscribe({
      next : val =>{
        if(val == null){
          console.log("the student is not exist you can added");
          this.isExsit = false;
          this.studentService.saveStudent(formData).subscribe({
                next : value => { 
                  this.student = value;
                  this.isSave = true;
                  console.log("the student is save");

                },
                error : err => {console.log(err); this.isSave = false;console.log("the student is not save");}
                
              })
        }else{
          this.student = val;
          this.isExsit = true;
          this.isSave = false
        }

      },
      error : err => {
        console.log(err); 
      }


  });
  
}

}
