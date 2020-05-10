import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  ingresosEgresos: IngresoEgreso[] = [];

  constructor(
    private _store: Store<AppState>,
    private _ingresoEgresoService:IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.subscription = this._store.select('ingresoEgreso')
      .subscribe(({ items }) => this.ingresosEgresos = items);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete(id: string) {
    Swal.fire({
      title:'¿Está seguro de eliminar el registro?',
      icon:'question',
      showCancelButton:true,
      cancelButtonText:'cancelar'
    }).then(({value})=>{
      if(value){
        this._ingresoEgresoService.delete(id).then(()=>{
          Swal.fire('Eliminado correctamente','','success');
        });
      }
    });
  }

}
