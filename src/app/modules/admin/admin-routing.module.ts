import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminRoleGuard } from '@core/guards/admin-role.guard';

const routes: Routes = [
 { path: '',
    component: AdminPageComponent,
    canActivate: [AdminRoleGuard],
  } // Aquí se aplica el guard AdminRoleGuard a la ruta del componente de administrador.
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }