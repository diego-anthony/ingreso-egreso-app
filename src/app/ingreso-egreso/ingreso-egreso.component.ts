import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as uiActions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm:FormGroup;
  tipo:string = 'ingreso';
  uiSubscription:Subscription;
  isLoading:boolean = false;

  constructor(
    private _formBuilder:FormBuilder,
    private _ingresoEgresoService:IngresoEgresoService,
    private _store:Store<AppState>) { }

  ngOnInit(): void {
    this.createForm();
    this.uiSubscription = this._store.select('ui')
      .subscribe( uiState => this.isLoading = uiState.isLoading)
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  createForm() {
    this.ingresoForm = this._formBuilder.group({
      descripcion:['',Validators.required],
      monto:[0, [Validators.required, Validators.min(0)]],
    });
  }

  add(){
    if(this.ingresoForm.invalid) return;
    const {descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto,this.tipo);
    this._store.dispatch(uiActions.startLoading());
    this._ingresoEgresoService.add(ingresoEgreso)
      .then( () => {
        this.ingresoForm.reset();
        this._store.dispatch(uiActions.stopLoading());
        Swal.fire('Registrado correctamente','', 'success')
      })
      .catch(error => {
        this._store.dispatch(uiActions.stopLoading());
        console.log(error);
        Swal.fire(error, 'error');
      });
  }

}
