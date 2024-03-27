"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
exports.login = (callback) => {
    dotenv_1.default.config();
    try {
        const token = jsonwebtoken_1.default.sign({ autenticado: true }, String(process.env.SECRET), {
            expiresIn: "15h" // Token com duração de 15 min
        });
        callback(null, token);
    }
    catch (err) {
        callback(err, '');
    }
};
