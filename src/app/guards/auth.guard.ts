import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService:AuthService,
    private _router:Router){}

  canActivate(): Observable<boolean> {
    return this._authService.isAuthenticated().pipe(
      tap( isAuthenticated => {
        if(!isAuthenticated){
          this._router.navigate(['/login']);
        }
      })
    )
  }
  
}
