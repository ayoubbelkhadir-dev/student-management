import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
/*  public username :any;
  public roles : string[] = []
  public isAuthenticated : boolean = false;*/
  constructor(private http:HttpClient){}



  login(credentials: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);
    return this.http.post(`${environment.loginUrl}`, body.toString(), { headers });
  }
  isTokenExpired(): boolean {
    const expiration = localStorage.getItem('expirationToken');
    if (!expiration) {
      return true; 
    }
  
    const expirationDate = new Date(expiration);
    return expirationDate <= new Date(); 
  }

  logout(){
    localStorage.clear()
    localStorage.setItem('isAuthenticated',"false");
  }
}
