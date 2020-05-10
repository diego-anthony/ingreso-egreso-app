import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private _authService:AuthService,
    private _router:Router){}

  canLoad(): Observable<boolean> {
    return this._authService.isAuthenticated().pipe(
      tap( isAuthenticated => {
        if(!isAuthenticated){
          this._router.navigate(['/login']);
        }
      }),
      take(1)
    )
  }
  
}
