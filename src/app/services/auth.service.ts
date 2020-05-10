import { Injectable } from '@angular/core';

import "firebase/firestore";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from "rxjs/operators";
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: Usuario;

  get user() {
    return this._user;
  }

  constructor(
    public auth: AngularFireAuth,
    private _firestore: AngularFirestore,
    private _store: Store<AppState>) { }

  initAuth() {
    this.auth.authState.subscribe(fileStoreUser => {
      if (fileStoreUser) {
        this.userSubscription = this._firestore.doc(`${fileStoreUser.uid}/usuario`).valueChanges()
          .subscribe((usuario: Usuario) => {
            this._user = usuario;
            this._store.dispatch(authActions.setUser({ user: usuario }));
          });
      }
      else {
        this._user = null;
        this.userSubscription?.unsubscribe();
        this._store.dispatch(authActions.unSetUser());
      }
    });
  }

  register(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const userCreated = new Usuario(user.uid, nombre, user.email);
        const url = `${user.uid}/usuario`
        return this._firestore.doc(url).set({ ...userCreated });
      });
  }

  login(user: string, password: string) {
    return this.auth.signInWithEmailAndPassword(user, password);
  }
  isAuthenticated() {
    return this.auth.authState.pipe(
      map(res => res !== null)
    );
  }

  signOut() {
    return this.auth.signOut();
  }
}
