import { NgModule } from "@angular/core";
import { PrimeNGModule } from "src/app/primeng.module";
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
        ConveniosRoutingModule
    ]
})

export class ConveniosModule {}