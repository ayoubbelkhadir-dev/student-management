import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  standalone: false,
  
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {
  username!:any;
  isAuthenticated!:any
  roles:any
  constructor(public authService :AuthService,private router:Router){}

  ngOnInit(){
    this.username= localStorage.getItem("username");
    this.isAuthenticated= localStorage.getItem("isAuthenticated");
    this.roles = localStorage.getItem("roles");
    this.checkTokenExpiration();
  }
  checkTokenExpiration() {
    setInterval(() => {
      const isExpired = this.authService.isTokenExpired();
      if (isExpired) {
        console.warn('Token expiré, redirection vers la page de login.');
        this.logout();
      }
    }, 1000);
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl("login");

  }

}
