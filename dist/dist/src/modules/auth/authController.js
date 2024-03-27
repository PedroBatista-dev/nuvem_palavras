"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaParamLogin = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.validaParamLogin = (user, callback) => {
    if (user.login != process.env.USER) {
        callback(false, "Parâmetro login incorreto");
    }
    else if (user.password != process.env.PASSWORD) {
        callback(false, "Parâmetro senha incorreto");
    }
    else {
        callback(true, "Parâmetros validados com sucesso");
    }
};
