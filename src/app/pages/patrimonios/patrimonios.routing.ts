import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { PatrimonioCadastroComponent } from './patrimonio-cadastro/patrimonio-cadastro.component';
import { PatrimoniosListaComponent } from './patrimonios-lista/patrimonios-lista.component';

const routes: Routes = [
  {
    path: '', component: PatrimoniosListaComponent,
    canActivate: [AuthGuard],
    data: {roles: ['R_PAT']}
    },
    {
      path: 'novo', component: PatrimonioCadastroComponent,
      canActivate: [AuthGuard],
      data: {roles: ['C_PAT']}
    },
    {
      path: ':id', component: PatrimonioCadastroComponent,
      canActivate: [AuthGuard],
      data: {roles: ['U_PAT']}
  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatrimoniosRoutingModule { }
