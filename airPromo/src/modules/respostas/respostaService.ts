import dbconnection from "../../infra/server/dbconnection";
import { Resposta, RespostaQuantidadeResponse } from "./resposta";
import { OkPacket, RowDataPacket } from "mysql2";
import ExcelJS from 'exceljs';
import { ajustarColunasExcel } from "../../infra/rotinas/excel";
import * as palavrasChaveService from "../tema/palavraChaveService";

export const postResposta = (data: Resposta, callback: Function) => {
    
    const queryString = "INSERT INTO `Respostas`(`Texto`) " +
                        "VALUES (?)"

    dbconnection.query(
        queryString,
        [data.Texto],
        (err, result) => {
            if (err) {
                callback(err)
            };

            const insertId = (<OkPacket>result).insertId;
            const palavras = data.Texto.split(' ').map((palavra) => palavra.toLowerCase().replace(/ç/gi, 'c')
                                                                            .replace(/ã/gi, 'a').replace(/á/gi, 'a')
                                                                            .replace(/é/gi, 'e').replace(/ê/gi, 'e')
                                                                            .replace(/õ/gi, 'o'))
            palavrasChaveService.buscarTemas(palavras, insertId)
            callback(null, insertId);        
        }
    );
}

export const getNovos = (callback: Function) => {
    const query = "SELECT * " +
                    "FROM `Respostas` " +
                    "WHERE Retornada = 'N' "
    
    const resultRespostas: Resposta[] = [];

    dbconnection.query(
        query,
        [],
        (err, result) => {
            if (err) {
                callback(err)
            }
            else {
                const rows = <RowDataPacket[]>result;
                rows.forEach(row => {
                    resultRespostas.push({
                        Texto: row.Texto,
                        Retornada: row.Retornada,
                        CodigoResposta: row.CodigoResposta
                    })
                    atualizarRespostaRetornada(row.CodigoResposta)
                });
                
                callback(null, resultRespostas);
            }
        }
    )
}

function atualizarRespostaRetornada(codigoResposta: number) {
    const query = "UPDATE `Respostas` SET Retornada = 'S' " +
        "WHERE CodigoResposta = ?"
    dbconnection.query(
        query,
        [codigoResposta],
        (err, result) => {
            if (err) {
                console.log(err.message ? err.message : err)
            }
        }
    )
    return true;
} 

export const getQuantidades = (callback: Function) => {
    const query = "SELECT * FROM ( " +
                        "SELECT `Texto`, `Descricao` AS Tema, COUNT(`Texto`) AS Quantidade " +
                            "FROM `Temas`  " +
                            "LEFT JOIN `RespostasTemas` ON Temas.CodigoTema = RespostasTemas.CodigoTema  " +
                            "LEFT JOIN `Respostas` ON RespostasTemas.CodigoResposta = Respostas.CodigoResposta  " +
                            "GROUP BY `Texto`, `Descricao` " +
                        "UNION  " +
                        "SELECT `Texto`, `Descricao` AS Tema, COUNT(`Texto`) AS Quantidade " +
                            "FROM `Respostas`  " +
                            "LEFT JOIN `RespostasTemas` ON Respostas.CodigoResposta = RespostasTemas.CodigoResposta  " +
                            "LEFT JOIN `Temas` ON RespostasTemas.CodigoTema = Temas.CodigoTema " +
                            "WHERE RespostasTemas.CodigoTema IS NULL " +
                            "GROUP BY `Texto`, `Descricao` " +
                        ") AS Tabela " +
                            "ORDER BY `Tema` "

    dbconnection.query(
        query,
        [],
        (err, result) => {
            if (err) {
                callback(err)
            }
            else {
                const rows = <RowDataPacket[]>result;
                const resultRespostas: RespostaQuantidadeResponse[] = []
                rows.forEach(row => {
                    resultRespostas.push({
                        Quantidade: row.Quantidade,
                        Tema: row.Tema,
                        Texto: row.Texto
                    })
                });
                callback(null, resultRespostas);
            }
        }
    )
}

export const getRelatorioTematico = (callback: Function) => {
    getQuantidades(async (err : Error, respostasQuantidades : RespostaQuantidadeResponse[]) =>{
        if(err){
            callback(err)
        }
        else {
            if (respostasQuantidades.length > 0) {
                const workbook = new ExcelJS.Workbook();

                let tema = respostasQuantidades[0].Tema || 'Outro';
                let workSheet = workbook.addWorksheet(tema);
                let totalTema = 0;
                workSheet.addRow(['Resposta', 'Quantidade']).font = { bold : true}

                for (let item of respostasQuantidades) {
                    if ((item.Tema || 'Outro') == tema) {
                        if (item.Quantidade > 0) {
                            workSheet.addRow([item.Texto, item.Quantidade])
                        }
                        else {
                            workSheet.addRow([])
                        }
                        totalTema += item.Quantidade;
                    }
                    else {
                        workSheet.addRow([])
                        workSheet.addRow(['Total', totalTema]).font = { bold: true }
                        ajustarColunasExcel(workSheet);
                        tema = item.Tema || 'Outro';
                        workSheet = workbook.addWorksheet(tema);

                        workSheet.addRow(['Resposta', 'Quantidade']).font = { bold : true}
                        if (item.Quantidade > 0) {
                            workSheet.addRow([item.Texto, item.Quantidade])
                        }
                        else {
                            workSheet.addRow([])
                        }
                        totalTema = item.Quantidade
                    }
                }

                workSheet.addRow([])
                workSheet.addRow(['Total', totalTema]).font = { bold: true }
                ajustarColunasExcel(workSheet);
                const xlsx = await workbook.xlsx.writeBuffer() as Buffer;

                callback(null, {
                    filename: "RespostasTemas.xlsx",
                    encoding: "base64",
                    content: xlsx.toString("base64")
                })
            }
            else {
                callback(null, {
                    filename: '',
                    content: '',
                    enconding: ''
                })
            }
        }
    })
}

export const getRelatorioPercentual = (callback: Function) => {
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

                if (rows.length > 0) {
                    const workbook = new ExcelJS.Workbook();

                    let workSheet = workbook.addWorksheet('RelatorioPercentual');
                    workSheet.addRow(['Relatório percentual de respostas por tema']).font = { size: 14 , bold : true}
                    workSheet.addRow([])
                    workSheet.addRow(['Tema', 'Percentual por Respostas (%)', 'Percentual por Categoria Vinculada (%)']).font = { bold : true }

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
                        workSheet.addRow([tema, percentualResposta, percentualCategoria])
                    });

                    ajustarColunasExcel(workSheet);
                    const xlsx = await workbook.xlsx.writeBuffer() as Buffer;

                    callback(null, {
                        filename: "RelatorioTemasPercentuais.xlsx",
                        encoding: "base64",
                        content: xlsx.toString("base64")
                    })
                }
                else {
                    callback(null, {
                        filename: '',
                        content: '',
                        enconding: ''
                    })
                }
            }
        }
    )
}