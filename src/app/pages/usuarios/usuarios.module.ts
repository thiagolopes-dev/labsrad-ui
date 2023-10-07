import { NgModule } from '@angular/core';

import { PrimeNGModule } from '../../primeng.module';

import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';
import { UsuariosRountingModule } from './usuarios.routing';

import { SharedModule } from 'src/app/shared/shared.module';

import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { UsuariosEditarComponent } from './usuarios-editar/usuarios-editar.component';

@NgModule({
  declarations: [
   UsuarioCadastroComponent,
    UsuariosListaComponent,
    UsuariosEditarComponent,
    AlterarSenhaComponent
  ],

  imports: [
    PrimeNGModule,
    UsuariosRountingModule,
   // ValidateEqualModule,
    SharedModule
  ]
})
export class UsuariosModule { }
