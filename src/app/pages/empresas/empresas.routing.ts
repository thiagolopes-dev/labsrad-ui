import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresasListaComponent } from './empresas-lista/empresas-lista.component';
import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';
import { AuthGuard } from '../seguranca/auth.guard';


const routes: Routes = [
  {
  path: '', component: EmpresasListaComponent,
  canActivate: [AuthGuard],
  // data: {roles: ['R_EMP']}
  },
  {
    path: 'novo', component: EmpresaCadastroComponent,
    canActivate: [AuthGuard],
    // data: {roles: ['C_EMP']}
  },
  {
    path: ':id', component: EmpresaCadastroComponent,
    canActivate: [AuthGuard],
    // data: {roles: ['U_EMP']}

},

  ];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class EmpresasRountingModule { }

