import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { RegisterComponent } from './auth/register/register.component';
import { dashboardRoutes } from './dashboard/dashboard.router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{
    path: 'login', component: LoginComponent
},
{
    path: 'register', component: RegisterComponent
},
{
    path: '', component: DashboardComponent,
    children: dashboardRoutes,
    canActivate:[AuthGuard]
},
{
    path: 'ingreso-egreso', component: IngresoEgresoComponent,
    canActivate:[AuthGuard]
}]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }