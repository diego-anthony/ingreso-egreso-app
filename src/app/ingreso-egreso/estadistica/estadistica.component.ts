import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { tap } from 'rxjs/operators';
import { AppStateIngresoEgreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  ingresosEgresos: IngresoEgreso[] = [];

  amountIngresos: number = 0;
  amountEgresos: number = 0;

  totalAmount: number = 0;
  diference: number = 0;

  percentIngresos: number = 0;
  percentEgresos: number = 0;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[0, 0]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private _store: Store<AppStateIngresoEgreso>
  ) { }

  ngOnInit(): void {
    this._store.select('ingresoEgreso').subscribe(({ items }) => {
      if (items && items.length > 0) {
        this.amountIngresos = this._calculateTotalByType(items, 'ingreso');
        this.amountEgresos = this._calculateTotalByType(items, 'egreso');

        this.totalAmount = this.amountEgresos + this.amountIngresos;
        this.diference = this.amountIngresos - this.amountEgresos;

        this.percentIngresos = this._calculatePercent(this.amountIngresos);
        this.percentEgresos = this._calculatePercent(this.amountEgresos);

        this.doughnutChartData = [
          [this.amountIngresos, this.amountEgresos],
        ];
      }
    })
  }

  private _calculateTotalByType(items: IngresoEgreso[], type: string): number {
    let total = 0;
    if (items?.length > 0) {
      let amounts = items.filter(x => x.tipo === type).map(x => x.monto);
      if (amounts?.length > 0) {
        total = amounts.reduce((acc, curr) => acc + curr);
      }
    }
    return total;
  }

  private _calculatePercent(total: number) {
    return total / (this.totalAmount);
  }

}
