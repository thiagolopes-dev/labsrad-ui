import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuariosEditarComponent } from './usuarios-editar/usuarios-editar.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';

const routes: Routes = [
  {
  path: '', component: UsuariosListaComponent,

  },
  {
    path: 'novo', component: UsuarioCadastroComponent,
  
  },
  {
    path: ':id', component: UsuariosEditarComponent,
   

},
{
  path: ':id/senha', component: AlterarSenhaComponent,
 

},
  ];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class UsuariosRountingModule { }

