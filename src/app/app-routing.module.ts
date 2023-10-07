import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'atendimentos' , loadChildren: () => 
    import('./pages/atendimentos/atendimentos.module').then(m => m.AtendimentosModule)
  },
  {
    path: 'convenios' , loadChildren: () => 
    import('./pages/convenios/convenios.module').then(m => m.ConveniosModule)
  },
  {
    path: 'empresas' , loadChildren: () => 
    import('./pages/empresas/empresas.module').then(m => m.EmpresaModule)
  },
  {
    path: 'exames' , loadChildren: () => 
    import('./pages/exames/exames.module').then(m => m.ExamesModule)
  },
  {
    path: 'pacientes' , loadChildren: () => 
    import('./pages/pacientes/pacientes.module').then(m => m.PacientesModule)
  },
  {
    path: 'patrimonios' , loadChildren: () => 
    import('./pages/patrimonios/patrimonios.module').then(m => m.PatrimoniosModule)
  },
  {
    path: 'relatorios', loadChildren: () =>
      import('./pages/relatorios/relatorios.module').then(m => m.RelatoriosModule)
  },
  {
    path: 'usuarios', loadChildren: () =>
    import('./pages/usuarios/usuarios.module').then(m =>  m.UsuariosModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
