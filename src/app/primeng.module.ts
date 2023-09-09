import { NgModule } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    exports: [
    ButtonModule,
    InputTextModule
    ]
})

export class PrimeNGModule {}