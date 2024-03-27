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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarTemas = void 0;
const dbconnection_1 = __importDefault(require("../../infra/server/dbconnection"));
const respostaTemaService = __importStar(require("../respostas/respostaTemaService"));
exports.buscarTemas = (palavras, codigoResposta) => {
    const temasIncluidos = [];
    for (let palavra of palavras) {
        const query = "SELECT CodigoTema FROM PalavrasChaves WHERE Descricao = ? ";
        dbconnection_1.default.query(query, [palavra], (err, result) => {
            if (err) {
                console.log(err.message ? err.message : err);
            }
            ;
            const rows = result;
            if (rows.length > 0 && !temasIncluidos.includes(rows[0].CodigoTema)) {
                temasIncluidos.push(rows[0].CodigoTema);
                respostaTemaService.postRespostaTema({
                    CodigoResposta: codigoResposta,
                    CodigoTema: rows[0].CodigoTema
                });
            }
        });
    }
    return true;
};
