import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Convenios } from 'src/app/core/models/convenios.model';
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
   convenio = new Convenios();
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
