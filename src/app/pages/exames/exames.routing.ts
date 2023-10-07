import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExameCadastroComponent } from './exame-cadastro/exame-cadastro.component';
import { ExamesListaComponent } from './exames-lista/exames-lista.component';


const routes: Routes = [

  {
  path: '', component: ExamesListaComponent,
  },
  {
    path: 'novo', component: ExameCadastroComponent,
  },
  {
    path: ':id', component: ExameCadastroComponent,

},

  ];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class ExamesRountingModule { }

