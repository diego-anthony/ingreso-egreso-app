import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(
    private _authService:AuthService,
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

  signOut(){
    this._authService.signOut();
    this._router.navigate(['/login'])
  }

}
