"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidaToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Token deveria puxar do env
function ValidaToken(req, res, next) {
    const token = req.headers['x-access-token'];
    var erro;
    erro = "";
    if (!token) {
        return res.status(401).json({
            "auth": false,
            "message": 'Token não inserido'
        });
    }
    try {
        jsonwebtoken_1.default.verify(token, String(process.env.SECRET), function (err) {
            if (err) {
                erro = err.message;
                return res.status(401).json({
                    "auth": false,
                    "message": 'Falha na Autenticação do token.'
                });
            }
            else {
                const response = jwt_decode_1.default(token);
                //                req.body.autenticado = response.autenticado;
            }
        });
        if (erro == "") {
            next();
        }
    }
    catch (E) {
        if (E instanceof Error) {
            E.message;
        }
    }
}
exports.ValidaToken = ValidaToken;
