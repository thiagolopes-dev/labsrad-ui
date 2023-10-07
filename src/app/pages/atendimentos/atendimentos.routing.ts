import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtendimentoCadastroComponent } from './atendimento-cadastro/atendimento-cadastro.component';
import { AtendimentosListaComponent } from './atendimentos-lista/atendimentos-lista.component';


const routes: Routes = [

  {
  path: '', component: AtendimentosListaComponent,
  },
  {
    path: 'novo', component: AtendimentoCadastroComponent,
  },
  {
    path: ':id', component: AtendimentoCadastroComponent,

},

  ];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class AtendimentosRountingModule { }

