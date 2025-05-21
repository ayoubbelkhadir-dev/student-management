import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm! : FormGroup;
  constructor(private fb:FormBuilder,private authService :AuthService,private router : Router){}
  ngOnInit(){
    this.loginForm = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    })
  }
  login(){
    const credentials = { username: this.loginForm.value.username,password : this.loginForm.value.password};
    this.authService.login(credentials).subscribe({
      next: (response) => {
        const accessToken = response['access-token'];
        const username = response['username'];
        const roles = response['roles'];
        const date = new Date(Date.now() + 20 * 60 * 1000);
        console.log('Authenticed:');
        localStorage.setItem("expirationToken",date.toISOString())
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('username', username);
        localStorage.setItem('roles', roles);
        localStorage.setItem('isAuthenticated',"true");
        this.router.navigateByUrl("/admin");
      
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }


}
