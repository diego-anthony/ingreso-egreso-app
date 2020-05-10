import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  user: Usuario;
  userSubs: Subscription;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.userSubs = this._store.select('auth')
      .subscribe(({ user }) => this.user = user);
  }
  
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  signOut() {
    this._authService.signOut();
    this._router.navigate(['/login'])
  }

}
