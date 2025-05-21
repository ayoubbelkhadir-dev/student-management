import { Component } from '@angular/core';
import { Student } from '../model/student.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-edit-student',
  standalone: false,
  
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent {
  student! : Student; 
  formGroup! : FormGroup;
  isEdit! :boolean;
  constructor(private ar : ActivatedRoute,private fb : FormBuilder,private studentService : StudentService){}
  ngOnInit(){
    this.formGroup = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      code:this.fb.control(''),
      programeId: this.fb.control(''),
      photo:this.fb.control(''),
    });
    let code = this.ar.snapshot.params['code'];
    this.studentService.getStudentByCode(code).subscribe({
      next : val => {
        if(val != null){
          this.student = val;
          this.formGroup.patchValue({
            firstname: this.student.firstname,
            lastname: this.student.lastname,
            code: this.student.code,
            programeId: this.student.programeId,
            photo: this.student.photo,
          });
        }
      },
      error :err => {console.log(err);
      }

    })

  
  }

  editStudentById(){
    let formData = new FormData();
    formData.set("firstname",this.formGroup.value.firstname);
    formData.set("lastname",this.formGroup.value.lastname);
    formData.set("programeId",this.formGroup.value.programeId);
    formData.set("photo",this.formGroup.value.photo);
    this.studentService.editStudent(this.student.id,formData).subscribe({
      next : val => {this.student = val;
      this.isEdit = true;},
      error : err => {console.log(err);
      this.isEdit = false;}
    })
  }

}
