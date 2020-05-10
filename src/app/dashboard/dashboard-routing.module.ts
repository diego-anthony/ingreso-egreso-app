import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.router';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
      path: '',
      component:DashboardComponent,
      children:dashboardRoutes
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class DashboardRoutingModule { }
