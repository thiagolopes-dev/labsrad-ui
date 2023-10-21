import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    exports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        CardModule,
        TooltipModule,
        ProgressSpinnerModule,
        InputSwitchModule,
        KeyFilterModule,
        SplitButtonModule,
        TableModule
    ]
})
export class PrimeNGModule{}