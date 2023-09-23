import { NgModule } from "@angular/core";
import { PrimeNGModule } from "src/app/primeng.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ConvenioCadastroComponent } from "./convenio-cadastro/convenio-cadastro.component";
import { ConveniosListaComponent } from "./convenios-lista/convenios-lista.component";
import { ConveniosRoutingModule } from "./convenios.routing";

@NgModule({
    declarations: [
        ConveniosListaComponent,
        ConvenioCadastroComponent
    ],
    imports: [
        PrimeNGModule,
        ConveniosRoutingModule,
        SharedModule
    ]
})

export class ConveniosModule {}