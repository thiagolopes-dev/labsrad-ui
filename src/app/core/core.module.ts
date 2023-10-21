import { NgModule } from "@angular/core";
import { MessageService } from "primeng/api";
import { AtendimentosService } from "../pages/atendimentos/atendimentos.service";
import { ConveniosService } from "../pages/convenios/convenios.service";
import { DashboardService } from "../pages/dashboards/dashboard.service";
import { EmpresasService } from "../pages/empresas/empresas.service";
import { ExamesService } from "../pages/exames/exames.service";
import { PacientesService } from "../pages/pacientes/pacientes.service";
import { RelatoriosService } from "../pages/relatorios/relatorios.service";
import { UsuariosService } from "../pages/usuarios/usuarios.service";
import { ValidationService } from "./services/validation.service";

@NgModule({
  declarations: [],
  imports: [],
  providers: [
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
  ]
})
export class CoreModule {}