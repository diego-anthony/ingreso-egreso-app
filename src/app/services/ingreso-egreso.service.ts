import "firebase/firestore";
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private _firestore: AngularFirestore,
    private _authService: AuthService) { }

  add(model: IngresoEgreso) {
    const id = this._authService.user.uid;
    const url = `${id}/ingreso-egreso`;
    delete model.uid;
    return this._firestore.doc(url)
      .collection('items').add({ ...model });
  }

  delete(uid: string) {
    const id = this._authService.user.uid;
    const url = `${id}/ingreso-egreso/items/${uid}`;
    return this._firestore.doc(url).delete();
  }

  ingresoEgresoListener(uid: string) {
    const url = `${uid}/ingreso-egreso/items`;
    return this._firestore.collection(url).snapshotChanges().pipe(
      map(snapshot => snapshot.map(doc => ({
        uid: doc.payload.doc.id,
        ...doc.payload.doc.data() as any
      })
      )
      )
    );
  }
}
