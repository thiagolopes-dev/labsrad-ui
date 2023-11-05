import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ValidateEqualModule } from "ng-validate-equal";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { AtendimentosService } from "../pages/atendimentos/atendimentos.service";
import { ConveniosService } from "../pages/convenios/convenios.service";
import { DashboardService } from "../pages/dashboards/dashboard.service";
import { EmpresasService } from "../pages/empresas/empresas.service";
import { ExamesService } from "../pages/exames/exames.service";
import { PacientesService } from "../pages/pacientes/pacientes.service";
import { RelatoriosService } from "../pages/relatorios/relatorios.service";
import { AuthService } from "../pages/seguranca/auth.service";

import { UsuariosService } from "../pages/usuarios/usuarios.service";
import { PrimeNGModule } from "../primeng.module";
import { SharedModule } from "../shared/shared.module";
import { ErrorHandlerService } from "./error-handler.service";
import { LayoutComponent } from "./layout/layout.component";
import { NaoAutorizadoComponent } from "./layout/nao-autorizado/nao-autorizado.component";
import { AlterarSenhaComponent } from "./layout/navbar/alterar-senha/alterar-senha.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { PaginaNaoEncontradaComponent } from "./layout/pagina-nao-encontrada/pagina-nao-encontrada.component";
import { ValidationService } from "./services/validation.service";

@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent,
    AlterarSenhaComponent
    
  ],
  imports: [
    PrimeNGModule,
    RouterModule,
    ConfirmDialogModule,
    SharedModule,
    ValidateEqualModule
  ],
  providers: [
    AuthService,
    JwtHelperService,
    ErrorHandlerService,
    ConfirmationService,
    MessageService,
    ValidationService,
    ExamesService,
    AtendimentosService,
    PacientesService,
    RelatoriosService,
    ConveniosService,
    UsuariosService,
    DashboardService,
    EmpresasService,
  ],
  exports: [
    LayoutComponent,
    ConfirmDialogModule
   ],
})
export class CoreModule {}