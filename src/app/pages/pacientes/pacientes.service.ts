import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { FiltrosPacientes } from 'src/app/core/models/filtro.model';
import { Pacientes } from 'src/app/core/models/pacientes.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class PacientesService {
    pacienteUrl: string;

    constructor(
        private http: HttpClient
    ) {
        this.pacienteUrl = `${environment.apiUrl}/pacientes`;
    }

    listar(): Promise<any> {
        return firstValueFrom(
            this.http.get(`${this.pacienteUrl}`))
            .then((response) => {
                const obj = response as any[];
                this.converterStringParaDataFiltro(obj);
                return obj;
            })
    }

    listarComFiltro(filtro: FiltrosPacientes): Promise<any> {
        const param: { [k: string]: any } = this.validarParametros(filtro);
        return firstValueFrom(
            this.http.get(`${this.pacienteUrl}/filtro`, { params: param }))
            .then((response: any) => {
                this.converterStringParaDataFiltro(response.content);
                return response;
            });
    }

    validarParametros(filtro: FiltrosPacientes) {
        const obj: { [k: string]: any } = {};
        obj.page = filtro.pagina;
        obj.size = filtro.itensPorPagina;
        if (filtro.id) {
            obj.id = filtro.id;
        }
        if (filtro.cpf) {
            obj.cpf = filtro.cpf;
        }
        if (filtro.nome) {
            obj.nome = filtro.nome;
        }
        if (filtro.sexo) {
            obj.sexo = filtro.sexo;
        }
        if (filtro.datanascde) {
            obj.datanascde = filtro.datanascde;
        }
        if (filtro.datanascate) {
            obj.datanascate = filtro.datanascate;
        }
        if (filtro.emailusuario) {
            obj.emailusuario = filtro.emailusuario;
        }
        if (filtro.datagravacaode) {
            obj.datagravacaode = filtro.datagravacaode;
        }
        if (filtro.datagravacaoate) {
            obj.datagravacaoate = filtro.datagravacaoate;
        }
        if (filtro.status) {
            obj.status = filtro.status;
        }
        return obj;
    }

    excluir(id: number): Promise<void> {
        return firstValueFrom(
            this.http.delete(`${this.pacienteUrl}/${id}`))
            .then(() => { null });
    }

    adicionar(paciente: Pacientes): Promise<Pacientes> {
        return firstValueFrom(
            this.http.post<Pacientes>(this.pacienteUrl, paciente));
    }

    atualizar(paciente: Pacientes): Promise<Pacientes> {
        return firstValueFrom(
            this.http.put(`${this.pacienteUrl}/${paciente.id}`, paciente))
            .then((response) => {
                const pacAlterado = response as Pacientes;
                this.converterStringParaDataFiltro([pacAlterado]);
                return pacAlterado;
            })
    }

    buscarPorId(id: number) {
        return firstValueFrom(this.http.get(`${this.pacienteUrl}/${id}`))
            .then((response) => {
                const paciente = response as Pacientes;
                this.converterStringParaData([paciente]);
                return paciente
            });
    }

    converterStringParaData(pacientes: Pacientes[]) {
        for (const paciente of pacientes) {
            if (paciente.datanasc === null) {
            } else {
                paciente.datanasc = moment(paciente.datanasc, 'YYYY-MM-DD').toDate();
            }
        }
    }

    converterStringParaDataFiltro(obj: any[]) {
        obj.forEach((element) => {
            if (element.datanasc) {
                element.datanasc = moment(element.datanasc, 'YYYY/MM/DD H:mm')
                    .tz('America/Sao_Paulo')
                    .toDate();
            }
            if (element.datagravacao) {
                element.datagravacao = moment(element.datagravacao, 'YYYY/MM/DD H:mm')
                    .tz('America/Sao_Paulo')
                    .toDate();
            }
        });
    }
}
