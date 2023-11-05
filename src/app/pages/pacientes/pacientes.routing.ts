import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteCadastroComponent } from './paciente-cadastro/paciente-cadastro.component';
import { PacientesListaComponent } from './pacientes-lista/pacientes-lista.component';


const routes: Routes = [

  {
  path: '', component: PacientesListaComponent,
  
  },
  {
    path: 'novo', component: PacienteCadastroComponent,
   
  },
  {
    path: ':id', component: PacienteCadastroComponent,
  

},

  ];

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class PacientesRountingModule { }

