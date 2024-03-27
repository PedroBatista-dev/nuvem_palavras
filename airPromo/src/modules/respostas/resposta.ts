export interface Resposta {
    CodigoResposta?: number,
    Texto: string,
    Retornada: string,
}

export interface RespostaQuantidadeResponse {
    Texto: string,
    Tema: string,
    Quantidade: number,
}

export interface RelatorioResponse {
    filename: string,
    content: string,
    encoding: string,
}