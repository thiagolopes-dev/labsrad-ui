import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    exports: [
        FormsModule,
        ButtonModule,
        InputTextModule,
        CardModule,
        TooltipModule,
        ProgressSpinnerModule
    ]
})
export class PrimeNGModule{}