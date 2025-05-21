import { Component } from '@angular/core';
import { AppRole, AppUser } from '../model/student.model';
import { ProfilService } from '../services/profil.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profil',
  standalone: false,
  
  templateUrl: './edit-profil.component.html',
  styleUrl: './edit-profil.component.css'
})
export class EditProfilComponent {
  profil!:AppUser;
  id! :any;
  formgroup!:FormGroup;
  roles!:Array<AppRole>;
  isEdit!:boolean;

  constructor(private profilService:ProfilService,
    private fb:FormBuilder,
    private ac :ActivatedRoute
  ){}

  ngOnInit(){
    this.isEdit = false;
    this.id = this.ac.snapshot.params["id"];
    this.formgroup = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control(''),
      roles: this.fb.control(''),
    })
    this.profilService.getRoles().subscribe({
      next : val => this.roles = val,
      error :err => console.log(err)
    })
    this.profilService.getProfilById(this.id).subscribe({
      next :val=> {
        this.profil = val;
        this.formgroup.patchValue({
          username: this.profil.username,
          password: this.profil.password,
          roles: this.profil.roles,
        })
      }
    })
  }

  editeProfil(){
    let appRoles:Array<AppRole>= [];
    appRoles.push(this.formgroup.value.roles);
    const appUser :AppUser= {
      id:this.profil.id,
      username: this.formgroup.value.username,
      password: this.formgroup.value.password,
      avatar:"",
      roles: appRoles
    }
    console.log(appUser)
    this.profilService.editeProfil(this.profil.id,appUser).subscribe({
      next : val => {
        console.log("Edite profil ok : ",val);
        this.profil = val;
        this.isEdit= true;
      },
      error : err => {
        console.log("error edite profil : ",err);
        this.isEdit = false;
      }
    })
  }
}
