import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: 'app-message',
    template: 
    `
    <div *ngIf="temErro()" class="p-message p-message-error">
    {{text}}
    </div>
    `, 
    styles: [`
    .p-message-error{
        margin: 0rem;
        margin-top: 0.25rem;
        border-radius: 12px;
        align-items: center;
        border: transparent;
        padding-left: 10px;
        font-size: 0.75rem;
    }
    `]
})
export class MessageComponent {
    @Input() error: string;
    @Input() control: FormControl;
    @Input() text: string;

    temErro(): boolean {
        return this.control.hasError(this.error) && this.control.touched;
    }
}