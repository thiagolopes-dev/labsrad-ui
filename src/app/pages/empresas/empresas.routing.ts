import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaCadastroComponent } from './empresa-cadastro/empresa-cadastro.component';
import { EmpresasListaComponent } from './empresas-lista/empresas-lista.component';


const routes: Routes = [
  {
  path: '', component: EmpresasListaComponent,

  },
  {
    path: 'novo', component: EmpresaCadastroComponent,
  },
  {
    path: ':id', component: EmpresaCadastroComponent,

},

  ];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class EmpresasRountingModule { }

