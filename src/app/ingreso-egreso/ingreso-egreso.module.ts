import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    DetalleComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
    OrdenIngresoPipe
  ],
  imports: [
    ChartsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso',ingresoEgresoReducer)
  ]
})
export class IngresoEgresoModule { }