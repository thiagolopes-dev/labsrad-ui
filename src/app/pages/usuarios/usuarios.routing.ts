import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';

import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioEditarComponent } from './usuario-editar/usuario-editar.component';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';

const routes: Routes = [
  {
  path: '', component: UsuariosListaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['R_USU']}
  },
  {
    path: 'novo', component: UsuarioCadastroComponent,
    canActivate: [AuthGuard],
    data: {roles: ['C_USU']}
  },
  {
    path: ':id', component: UsuarioEditarComponent,
    canActivate: [AuthGuard],
    data: {roles: ['U_USU']}

},
{
  path: ':id/senha', component: AlterarSenhaComponent,
  canActivate: [AuthGuard],
  data: {roles: ['U_USU']}

},
  ];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class UsuariosRountingModule { }

