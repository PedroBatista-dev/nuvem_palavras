import { RowDataPacket } from "mysql2";
import dbconnection from "../../infra/server/dbconnection";
import { IRelatorioPercentual } from "./tema";

export const getRespostasCategorias = (callback : Function) => {
    const query = "SELECT * FROM (SELECT Temas.Descricao, COUNT(Respostas.Texto) AS Quantidade, (SELECT COUNT(*) FROM `Respostas`) AS QuantidadeRespostas, " +
                        "((SELECT COUNT(*) FROM `RespostasTemas`) + (SELECT COUNT(*) FROM `Respostas` LEFT JOIN `RespostasTemas` ON Respostas.CodigoResposta = RespostasTemas.CodigoResposta WHERE RespostasTemas.CodigoTema IS NULL)) AS QuantidadeTemas  " +
                        "FROM `Temas`  " +
                        "LEFT JOIN `RespostasTemas` ON Temas.CodigoTema = RespostasTemas.CodigoTema  " +
                        "LEFT JOIN `Respostas` ON RespostasTemas.CodigoResposta = Respostas.CodigoResposta " +
                        "GROUP BY Temas.CodigoTema  " +
                    "UNION " +
                    "SELECT Temas.Descricao, COUNT(Respostas.Texto) AS Quantidade, (SELECT COUNT(*) FROM `Respostas`) AS QuantidadeRespostas,  " +
                        "((SELECT COUNT(*) FROM `RespostasTemas`) + (SELECT COUNT(*) FROM `Respostas` LEFT JOIN `RespostasTemas` ON Respostas.CodigoResposta = RespostasTemas.CodigoResposta WHERE RespostasTemas.CodigoTema IS NULL)) AS QuantidadeTemas  " +
                        "FROM `Respostas`  " +
                        "LEFT JOIN `RespostasTemas` ON Respostas.CodigoResposta = RespostasTemas.CodigoResposta  " +
                        "LEFT JOIN `Temas` ON RespostasTemas.CodigoTema = Temas.CodigoTema  " +
                        "WHERE RespostasTemas.CodigoTema IS NULL " +
                        "GROUP BY Temas.CodigoTema  " +
                    ") AS Tabela " +
                        "ORDER BY Descricao; "

    dbconnection.query(
        query,
        [],
        async (err, result) => {
            if (err) {
                callback(err)
            }
            else {
                const rows = <RowDataPacket[]>result;
                const itemsRelatorio: IRelatorioPercentual[] = [];

                if (rows.length > 0) {
                    let somaPercentualCategoria = 0;
                    const valoresValidos = rows.filter((row) => row.Quantidade > 0);
                    const ultimoValorValido = valoresValidos[valoresValidos.length - 1];
                   
                    rows.forEach(row => {
                        const tema = row.Descricao || 'Outro'
                        const percentualResposta = Math.round((row.Quantidade / row.QuantidadeRespostas)* 10000)/100;
                        let percentualCategoria =  0; 
                        if (ultimoValorValido.Descricao == row.Descricao) {
                            percentualCategoria = Math.round((100.00 - somaPercentualCategoria)*100)/100;
                        }
                        else {
                            percentualCategoria = Math.round((row.Quantidade / row.QuantidadeTemas)* 10000)/100;
                            somaPercentualCategoria += percentualCategoria 
                        }
                        itemsRelatorio.push({
                            Tema: tema,
                            PercentualCategoria: percentualCategoria,
                            PercentualResposta: percentualResposta,
                        })
                    });

                    callback(null, itemsRelatorio)
                }
                else {
                    callback(null, [])
                }
            }
        }
    )
}