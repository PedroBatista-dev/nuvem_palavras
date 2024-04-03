export interface Tema { 
    CodigoTema?: number,
    Descricao: string,
}

export interface IRelatorioPercentual {
    Tema: string,
    PercentualCategoria: number,
    PercentualResposta: number;
}