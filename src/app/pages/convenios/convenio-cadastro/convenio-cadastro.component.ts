import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Convenio } from 'src/app/core/models/convenio.model';

@Component({
  selector: 'app-convenio-cadastro',
  templateUrl: './convenio-cadastro.component.html',
  styleUrls: ['./convenio-cadastro.component.css']
})
export class ConvenioCadastroComponent {
   
   salvando: boolean = false;
   convenio = new Convenio();
  constructor(){}

  salvar(form: NgForm){}

}
