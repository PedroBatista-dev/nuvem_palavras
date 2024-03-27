"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelatorioPercentual = exports.getRelatorioTematico = exports.getQuantidades = exports.getNovos = exports.postResposta = void 0;
const dbconnection_1 = __importDefault(require("../../infra/server/dbconnection"));
const exceljs_1 = __importDefault(require("exceljs"));
const excel_1 = require("../../infra/rotinas/excel");
const palavrasChaveService = __importStar(require("../tema/palavraChaveService"));
exports.postResposta = (data, callback) => {
    const queryString = "INSERT INTO `Respostas`(`Texto`) " +
        "VALUES (?)";
    dbconnection_1.default.query(queryString, [data.Texto], (err, result) => {
        if (err) {
            callback(err);
        }
        ;
        const insertId = result.insertId;
        const palavras = data.Texto.split(' ').map((palavra) => palavra.toLowerCase().replace(/ç/gi, 'c')
            .replace(/ã/gi, 'a').replace(/á/gi, 'a')
            .replace(/é/gi, 'e').replace(/ê/gi, 'e')
            .replace(/õ/gi, 'o'));
        palavrasChaveService.buscarTemas(palavras, insertId);
        callback(null, insertId);
    });
};
exports.getNovos = (callback) => {
    const query = "SELECT * " +
        "FROM `Respostas` " +
        "WHERE Retornada = 'N' ";
    const resultRespostas = [];
    dbconnection_1.default.query(query, [], (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            const rows = result;
            rows.forEach(row => {
                resultRespostas.push({
                    Texto: row.Texto,
                    Retornada: row.Retornada,
                    CodigoResposta: row.CodigoResposta
                });
                atualizarRespostaRetornada(row.CodigoResposta);
            });
            callback(null, resultRespostas);
        }
    });
};
function atualizarRespostaRetornada(codigoResposta) {
    const query = "UPDATE `Respostas` SET Retornada = 'S' " +
        "WHERE CodigoResposta = ?";
    dbconnection_1.default.query(query, [codigoResposta], (err, result) => {
        if (err) {
            console.log(err.message ? err.message : err);
        }
    });
    return true;
}
exports.getQuantidades = (callback) => {
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
        "ORDER BY `Tema` ";
    dbconnection_1.default.query(query, [], (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            const rows = result;
            const resultRespostas = [];
            rows.forEach(row => {
                resultRespostas.push({
                    Quantidade: row.Quantidade,
                    Tema: row.Tema,
                    Texto: row.Texto
                });
            });
            callback(null, resultRespostas);
        }
    });
};
exports.getRelatorioTematico = (callback) => {
    exports.getQuantidades((err, respostasQuantidades) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            callback(err);
        }
        else {
            if (respostasQuantidades.length > 0) {
                const workbook = new exceljs_1.default.Workbook();
                let tema = respostasQuantidades[0].Tema || 'Outro';
                let workSheet = workbook.addWorksheet(tema);
                let totalTema = 0;
                workSheet.addRow(['Resposta', 'Quantidade']).font = { bold: true };
                for (let item of respostasQuantidades) {
                    if ((item.Tema || 'Outro') == tema) {
                        if (item.Quantidade > 0) {
                            workSheet.addRow([item.Texto, item.Quantidade]);
                        }
                        else {
                            workSheet.addRow([]);
                        }
                        totalTema += item.Quantidade;
                    }
                    else {
                        workSheet.addRow([]);
                        workSheet.addRow(['Total', totalTema]).font = { bold: true };
                        excel_1.ajustarColunasExcel(workSheet);
                        tema = item.Tema || 'Outro';
                        workSheet = workbook.addWorksheet(tema);
                        workSheet.addRow(['Resposta', 'Quantidade']).font = { bold: true };
                        if (item.Quantidade > 0) {
                            workSheet.addRow([item.Texto, item.Quantidade]);
                        }
                        else {
                            workSheet.addRow([]);
                        }
                        totalTema = item.Quantidade;
                    }
                }
                workSheet.addRow([]);
                workSheet.addRow(['Total', totalTema]).font = { bold: true };
                excel_1.ajustarColunasExcel(workSheet);
                const xlsx = yield workbook.xlsx.writeBuffer();
                callback(null, {
                    filename: "RespostasTemas.xlsx",
                    encoding: "base64",
                    content: xlsx.toString("base64")
                });
            }
            else {
                callback(null, {
                    filename: '',
                    content: '',
                    enconding: ''
                });
            }
        }
    }));
};
exports.getRelatorioPercentual = (callback) => {
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
        "ORDER BY Descricao; ";
    dbconnection_1.default.query(query, [], (err, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            callback(err);
        }
        else {
            const rows = result;
            if (rows.length > 0) {
                const workbook = new exceljs_1.default.Workbook();
                let workSheet = workbook.addWorksheet('RelatorioPercentual');
                workSheet.addRow(['Relatório percentual de respostas por tema']).font = { size: 14, bold: true };
                workSheet.addRow([]);
                workSheet.addRow(['Tema', 'Percentual por Respostas (%)', 'Percentual por Categoria Vinculada (%)']).font = { bold: true };
                let somaPercentualCategoria = 0;
                const valoresValidos = rows.filter((row) => row.Quantidade > 0);
                const ultimoValorValido = valoresValidos[valoresValidos.length - 1];
                rows.forEach(row => {
                    const tema = row.Descricao || 'Outro';
                    const percentualResposta = Math.round((row.Quantidade / row.QuantidadeRespostas) * 10000) / 100;
                    let percentualCategoria = 0;
                    if (ultimoValorValido.Descricao == row.Descricao) {
                        percentualCategoria = Math.round((100.00 - somaPercentualCategoria) * 100) / 100;
                    }
                    else {
                        percentualCategoria = Math.round((row.Quantidade / row.QuantidadeTemas) * 10000) / 100;
                        somaPercentualCategoria += percentualCategoria;
                    }
                    workSheet.addRow([tema, percentualResposta, percentualCategoria]);
                });
                excel_1.ajustarColunasExcel(workSheet);
                const xlsx = yield workbook.xlsx.writeBuffer();
                callback(null, {
                    filename: "RelatorioTemasPercentuais.xlsx",
                    encoding: "base64",
                    content: xlsx.toString("base64")
                });
            }
            else {
                callback(null, {
                    filename: '',
                    content: '',
                    enconding: ''
                });
            }
        }
    }));
};
