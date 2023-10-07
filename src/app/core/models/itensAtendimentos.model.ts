export class ItensAtendimentos {
    idconvenio?: number;
    idexame?: number;
    descricaoconvenio?: string;
    descricaoexame?: string;
    preco?: number;
    desconto?: number;
    acesso?: number;
    dataatendimento?: Date;

    constructor(
    idconvenio?: number,
    idexame?: number,
    descricaoconvenio?: string,
    descricaoexame?: string,
    preco?: number,
    desconto?: number,
    acesso?: number,
    dataatendimento?: Date,
    ){
    this.idconvenio = idconvenio;
    this.idexame = idexame;
    this.descricaoconvenio = descricaoconvenio;
    this.descricaoexame = descricaoexame;
    this.preco = preco;
    this.desconto = desconto;
    this.acesso = acesso;
    this.dataatendimento = dataatendimento;
    }
}