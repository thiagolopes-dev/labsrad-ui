import { Empresas } from "./empresas.model";
import { Permissoes } from "./permissoes.model";

export class Usuarios {
    id?: number;
    nome?: string;
    email?: string;
    senha?: string;
    csenha?: string;
    status?: boolean;
    empresaativa: string;
    idempresaativa: number;
    permissoes = new Array<Permissoes>();
    empresas = new Array<Empresas>();
}