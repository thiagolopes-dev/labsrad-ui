import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Convenio } from 'src/app/core/models/convenio.model';
import { Regex } from 'src/app/core/validators/regex';
import { ConveniosService } from '../convenios.service';

@Component({
  selector: 'app-convenio-cadastro',
  templateUrl: './convenio-cadastro.component.html',
  styleUrls: ['./convenio-cadastro.component.css']
})
export class ConvenioCadastroComponent implements OnInit {
   regex = new Regex();
   salvando: boolean = false;
   convenio = new Convenio();
   idConvenio: number;

   constructor(
    private convService: ConveniosService
   ){}

   ngOnInit() {
     this.convenio.status = true;
     
       
   }

  salvar(form: NgForm){
    console.log(this.convenio);
    this.salvando = true;
  }

}
