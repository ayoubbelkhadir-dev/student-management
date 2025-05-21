import { Component, ViewChild } from '@angular/core';
import { ProfilService } from '../services/profil.service';
import { AppRole } from '../model/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-role',
  standalone: false,
  
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
    displayColumns : Array<String> = ["id","rolename","delete"];
    roles! : Array<AppRole>;
    datasource : any;
    role : any;
    formgroup!:FormGroup;
    isSave!:boolean;
  
    constructor(
      private profilService : ProfilService,
      private fb:FormBuilder 
    ){}
    @ViewChild(MatPaginator)  matPagintor! :MatPaginator;
    @ViewChild(MatSort) matSort! : MatSort;
    ngOnInit(){
      this.formgroup = this.fb.group({
        nameRole : this.fb.control('')
      })
      this.profilService.getRoles().subscribe({
        next : value =>{
          this.roles = value;
          this.datasource = new MatTableDataSource(value);
          this.datasource.paginator = this.matPagintor;
          this.datasource.sort = this.matSort;
        },
        error: err =>{
          console.log(err);
        },
      })
    }

    saveRole(){
      let formdata = new FormData();
      formdata.set("nameRole",this.formgroup.value.nameRole);
      this.profilService.saveRole(formdata).subscribe({
        next : val=>{
          console.log("role add ",val)
          this.roles.push(val);
          this.datasource = new MatTableDataSource(this.roles);
          this.isSave = true;
        },
        error :err=>{
          console.log("error role add ",err)
          this.isSave = false;
        }
      })
    }
    deleteRole(role:any){
      let index = this.roles.indexOf(role);
      this.profilService.deleteRole(role.id).subscribe({
        next : val=>{
          console.log("role deleted ",val)
          this.roles.splice(index,1);
          this.datasource =new MatTableDataSource(this.roles);
          this.isSave = false;
        },
        error :err=>{
          console.log("error role deleted ",err)
        }
      })
    }
}
