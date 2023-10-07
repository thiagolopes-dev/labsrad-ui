export class ItensConvenios {
    idconvenio?: number;
    descricaoconvenio?: string;
    preco?: number;

  constructor(
    idconvenio?: number,
    descricaoconvenio?: string,
    preco?: number
  ) {
    this.idconvenio = idconvenio;
    this.descricaoconvenio = descricaoconvenio;
    this.preco = preco;
  }

}