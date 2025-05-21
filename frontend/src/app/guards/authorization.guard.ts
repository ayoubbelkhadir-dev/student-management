import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable()
export class AuthorizationGurad implements CanActivate{
  constructor(private authService : AuthService,private router:Router){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if(localStorage.getItem("isAuthenticated") == "true"){
      let roleAuthorited = route.data['roles'];
      let roleUser = localStorage.getItem("roles");
        if(roleUser != null && roleUser.includes(roleAuthorited)){
          return true;
        }

      return false;
    }else{
      this.router.navigateByUrl("login")
      return false;
    }
    
  }

}

