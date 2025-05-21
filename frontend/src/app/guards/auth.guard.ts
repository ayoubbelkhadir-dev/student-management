import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService : AuthService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    if(localStorage.getItem("isAuthenticated") == "true"){
      return true;
    }else{
      this.router.navigateByUrl("login")
      return false;
    }
    
  }

}

