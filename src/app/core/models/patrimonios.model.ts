import { Empresas } from "./empresas.model";

export class Patrimonios {
    id?: number;
    descricao?: string;
    dataaquisicao?: Date;
    datagravacao?: Date;
    valor?: number;
    status?: boolean;
    empresa = new Empresas();
}