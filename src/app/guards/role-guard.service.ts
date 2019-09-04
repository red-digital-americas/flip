import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {    
    const expectedRole = route.data.expectedRole;
    const token:any = localStorage.getItem('token');
      
    console.log("role false");
    if (token.role !== expectedRole) {
      this.router.navigate(['login']);
      console.log("role false");
      // return false;
    }
    return true;
  }
}