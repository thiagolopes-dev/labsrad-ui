import { Tenant } from "./tenant.model";

export class Pacientes {
    id?: number;
    nome?: string;
    datanasc?: Date;
    sexo?: string;
    cpf?: string;
    telefone?: string;
    status?: boolean;
    tenant = new Tenant();
}