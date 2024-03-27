"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRespostaTema = void 0;
const dbconnection_1 = __importDefault(require("../../infra/server/dbconnection"));
exports.postRespostaTema = (data) => {
    const queryString = "INSERT INTO `RespostasTemas`(`CodigoTema`, `CodigoResposta`) " +
        "VALUES (?, ?)";
    dbconnection_1.default.query(queryString, [data.CodigoTema, data.CodigoResposta], (err, result) => {
        if (err) {
            console.log(err.message ? err.message : err);
        }
        ;
        const insertId = result.insertId;
        return insertId;
    });
};
