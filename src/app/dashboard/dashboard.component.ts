import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { mergeMap, tap, filter, map } from 'rxjs/operators';
import { setIngresoEgreso } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(
    private _ingresoEgresoService: IngresoEgresoService,
    private _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this._store.select('auth').pipe(
      filter(({ user }) => user !== null),
      mergeMap(({ user }) => this._ingresoEgresoService.ingresoEgresoListener(user.uid))
    ).subscribe(ingresoEgresoList => {
      this._store.dispatch(setIngresoEgreso({items:ingresoEgresoList }))
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
