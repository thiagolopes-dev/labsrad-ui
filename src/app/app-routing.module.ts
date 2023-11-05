import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaoAutorizadoComponent } from './core/layout/nao-autorizado/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/layout/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AlterarSenhaComponent } from './pages/usuarios/alterar-senha/alterar-senha.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
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
  { path: 'alterarsenha', component: AlterarSenhaComponent },

  { path: 'nao-autorizado', component: NaoAutorizadoComponent },

  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },

  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
