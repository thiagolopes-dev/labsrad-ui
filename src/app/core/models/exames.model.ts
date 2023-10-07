import { ItensConvenios } from "./itensConvenios.model";

export class Exames {
    id?: number;
    descricao?: string;
    status: boolean;
    exameconvenios = new Array<ItensConvenios>();
}