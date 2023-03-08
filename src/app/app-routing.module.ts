import { HomeComponent } from './autentificacion/home/home.component';
import { LoginComponent } from './autentificacion/login/login.component';
import { AutentificacionModule } from './autentificacion/autentificacion.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
