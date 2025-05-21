import { Component } from '@angular/core';
import { ProfilService } from '../services/profil.service';
import { AppRole, AppUser } from '../model/student.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-profil',
  standalone: false,
  
  templateUrl: './add-profil.component.html',
  styleUrl: './add-profil.component.css'
})
export class AddProfilComponent {
  profil!:AppUser;
  formgroup!:FormGroup;
  isSave!:boolean;
  roles!:Array<AppRole>
  
    constructor(private profilService :ProfilService,private fb:FormBuilder){}
  
    ngOnInit(){
      this.formgroup = this.fb.group({
        username : this.fb.control(''),
        password : this.fb.control(''),
        roles : this.fb.control('')
      });

      this.profilService.getRoles().subscribe({
        next :val=>{
          this.roles = val
        },
        error:err => console.log(err)
      })
    }
    saveProfil() {
      let formdata = new FormData();
      formdata.set("username",this.formgroup?.value?.username);
      formdata.set("password",this.formgroup?.value?.password);
      console.log(this.formgroup?.value?.roles)
      let id : number= this.formgroup?.value?.roles

      this.profilService.saveProfil(formdata).subscribe({
        next: (val) => {
          console.log('Profil enregistré avec succès:', val);
          this.profil = val;
          console.log(this.profil.id)
          this.profilService.addRoleToProfil(this.profil.id,id).subscribe({
            next:val =>{
              this.isSave = true;
            console.log('Role add to user:', val);
          },
            error : err=>{
              console.log('error role add to user:',err);
              this.isSave = false;
          }

          })
        },
        error: (err) => {
          console.error('Erreur lors de l\'enregistrement du profil:', err);
          this.isSave = false;
        }
      });
    }
}
