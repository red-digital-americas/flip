import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {    
    const expectedRole:number[] = route.data.expectedRole;
    // console.log('Expected Roles', expectedRole);
    const systemTypeId:number = parseInt(localStorage.getItem("SystemTypeId"));
          
    if (!expectedRole.includes(systemTypeId)) {
      // this.router.navigate(['login']);      
      return false;
    }    
    return true;
  }
}