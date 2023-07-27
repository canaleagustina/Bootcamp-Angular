import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';
import { SessionGuard } from '@core/guards/session.guard';
import { AdminRoleGuard } from '@core/guards/admin-role.guard';
import { AdminPageComponent } from '@modules/admin/pages/admin-page/admin-page.component';


const routes: Routes = [
  {
    path:'auth',
    loadChildren:() => import('./modules/auth/auth.module').then(m=> m.AuthModule)
  },
  {
    path:'',
    component:HomePageComponent,
    loadChildren:() => import('./modules/home/home.module').then(m=> m.HomeModule),
    canActivate:[SessionGuard]
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AdminRoleGuard] // Agrega el guard aquí para proteger esta ruta.
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
