import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import {Student} from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http : HttpClient) { }

  private getHeaders():HttpHeaders{
    const token = localStorage.getItem("accessToken")
    return new HttpHeaders({
          Authorization : `Bearer ${localStorage.getItem("accessToken")}` 
        })

  }

  getAllStudent():Observable<Array<Student>>{
    const headers = this.getHeaders();
    return this.http.get<Array<Student>>(environment.studentUrl,{headers});
  }
  saveStudent(formdata : any):Observable<Student>{
    const headers = this.getHeaders();
    return this.http.post<Student>(environment.studentUrl,formdata,{headers});
  }
  getStudentByCode(code : any):Observable<Student>{
    const headers = this.getHeaders();
    return this.http.get<Student>(environment.studentUrl + "/studentCode/"+code,{headers});
  }
  deleteStudent(id :any):Observable<any>{
    const headers = this.getHeaders();
    return this.http.delete(environment.studentUrl + "/"+id,{headers});
  }

  editStudent(id:any,formdata : any):Observable<Student>{
    const headers = this.getHeaders();
    return this.http.put<Student>(environment.studentUrl + "/"+id,formdata,{headers});
  }
}
