import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AppUser } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http:HttpClient) { }
  private getHeader():HttpHeaders{
    return new HttpHeaders({
      Authorization : `Bearer ${localStorage.getItem("accessToken")}` 
    })
  }
  getProfils():Observable<any>{
    const headers = this.getHeader();
    return this.http.get(`${environment.userUrl}`,{headers})
  }
  saveProfil(userBody:any):Observable<any>{
    const headers = this.getHeader();
    return this.http.post(`${environment.userUrl}`,userBody,{headers})
  }
  editeProfil(id:any,userBody:any):Observable<any>{
    const headers = this.getHeader();
    return this.http.put(`${environment.userUrl}/${id}`,userBody,{headers})
  }

  deleteProfil(id:any):Observable<any>{
    const headers = this.getHeader();
    return this.http.delete(`${environment.userUrl}/${id}`,{headers})
  }
  getRoles():Observable<any>{
    const headers = this.getHeader();
    return this.http.get(`${environment.userUrl}/roles`,{headers})
  }
  addRoleToProfil(idProfil:number,idRole:number):Observable<AppUser>{
    const headers = this.getHeader();
    return this.http.post<AppUser>(`${environment.userUrl}/roleToUser/${idProfil}/${idRole}`,null,{headers})
  }

  getProfilById(id:any):Observable<any>{
    const headers = this.getHeader();
    return this.http.get(`${environment.userUrl}/userById/${id}`,{headers})
  }

  saveRole(userBody:any):Observable<any>{
    const headers = this.getHeader();
    return this.http.post(`${environment.userUrl}/roles`,userBody,{headers})
  }

  deleteRole(id:any):Observable<any>{
    const headers = this.getHeader();
    return this.http.delete(`${environment.userUrl}/roles/${id}`,{headers})
  }
}
