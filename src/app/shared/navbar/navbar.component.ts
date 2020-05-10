import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  user: Usuario;
  userSubs: Subscription;

  constructor(
    private _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.userSubs = this._store.select('auth')
      .subscribe(({user})=> this.user = user);
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

}
