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
const express_1 = __importDefault(require("express"));
const respostaService = __importStar(require("./respostas/respostaService"));
const respostaController = __importStar(require("./respostas/respostaController"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const configSwagger_1 = require("../infra/swagger/configSwagger"); // Para utilização dos testes automatizados esta linha deve estar comentada
const routes = express_1.default.Router();
routes.post('/resposta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const novaResposta = req.body;
    respostaController.validarPostResposta(novaResposta, (paramValido, message) => {
        if (!paramValido) {
            res.status(422).json({
                "statusCode": 422,
                "message": message
            });
        }
        else {
            respostaService.postResposta(novaResposta, (err, insertId) => {
                if (err) {
                    res.status(500).json({
                        "statusCode": 500,
                        "message": err.message
                    });
                }
                else {
                    res.status(200).json({
                        "statusCode": 200,
                        "CodigoResposta": insertId
                    });
                }
            });
        }
    });
}));
routes.get('/respostas/novos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    respostaService.getNovos((err, respostas) => {
        if (err) {
            res.status(500).json({
                "statusCode": 500,
                "message": err.message
            });
        }
        else {
            res.status(200).json({
                "statusCode": 200,
                "data": respostas
            });
        }
    });
}));
routes.get('/respostas/quantidade', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    respostaService.getQuantidades((err, respostasQuantidades) => {
        if (err) {
            res.status(500).json({
                "statusCode": 500,
                "message": err.message
            });
        }
        else {
            res.status(200).json({
                "statusCode": 200,
                "data": respostasQuantidades
            });
        }
    });
}));
routes.get('/respostas/relatorio-tematico', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    respostaService.getRelatorioTematico((err, relatorio) => {
        if (err) {
            res.status(500).json({
                "statusCode": 500,
                "message": err.message
            });
        }
        else {
            res.status(200).json({
                "statusCode": 200,
                "data": relatorio
            });
        }
    });
}));
routes.get('/respostas/relatorio-percentual', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    respostaService.getRelatorioPercentual((err, relatorio) => {
        if (err) {
            res.status(500).json({
                "statusCode": 500,
                "message": err.message
            });
        }
        else {
            res.status(200).json({
                "statusCode": 200,
                "data": relatorio
            });
        }
    });
}));
// Para utilização dos testes automatizados este bloco deve estar comentado
const configSwagger = new configSwagger_1.ConfigSwagger();
routes.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(configSwagger.swaggerDocument));
// Fim do bloco que deve estar comentado para uso dos testes automatizados
routes.get('/', function (req, res) {
    res.send('Api airPromo on-line');
});
exports.default = routes;
