import { Component } from '@angular/core';
import { AppUser } from '../model/student.model';
import { ProfilService } from '../services/profil.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profils!:Array<AppUser>

  constructor(private profilService :ProfilService,private router :Router){}

  ngOnInit(){
    this.profilService.getProfils().subscribe({
      next : val => {
        console.log("afficeh profils")
        this.profils = val;
        console.log(this.profils);

      },
      error :err=> {console.log(err);
      console.log("probleme profils")}
    })
  }
  addProfil(){
    this.router.navigateByUrl("admin/addprofile")
  }
  deleteProfil(profil:any){
    let index = this.profils.indexOf(profil);
    this.profilService.deleteProfil(profil.id).subscribe({
      next : val => {console.log("le profil delete by ",profil.id);
      this.profils.splice(index,1);},
      error:err => console.log("erreru deleted profil : ",err)
    })
  }
  editProfil(id:any){
    this.router.navigateByUrl(`admin/editprofile/${id}`);
  }
  manageRole(){
    this.router.navigateByUrl("admin/managerole");
  }
}
