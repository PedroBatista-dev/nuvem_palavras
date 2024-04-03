import express, { Request, Response } from "express";
import * as respostaService from './respostas/respostaService';
import * as temaService from './tema/temaService';
import * as respostaController from './respostas/respostaController';
import swaggerUi from 'swagger-ui-express';
import { RelatorioResponse, Resposta, RespostaQuantidadeResponse } from "./respostas/resposta";
import { ConfigSwagger } from '../infra/swagger/configSwagger'; // Para utilização dos testes automatizados esta linha deve estar comentada
import { IRelatorioPercentual } from "./tema/tema";

const routes = express.Router();

routes.post('/resposta', async (req: Request, res: Response) => {
    const novaResposta: Resposta = req.body;
    respostaController.validarPostResposta(novaResposta, (paramValido: boolean, message: string) => {
        if (!paramValido) {
            res.status(422).json({
                "statusCode": 422,
                "message": message
            });
        }
        else {
            respostaService.postResposta(novaResposta, (err: Error, insertId: number) => {
                if (err) {
                    res.status(500).json({
                        "statusCode": 500,
                        "message": err.message
                    })
                }
                else {
                    res.status(200).json({
                        "statusCode": 200,
                        "CodigoResposta": insertId
                    })
                }
            });
        }
    });
});

routes.get('/respostas/novos', async (req: Request, res : Response) => {
    respostaService.getNovos((err : Error, respostas : Resposta[]) =>{
        if(err){
            res.status(500).json({
                "statusCode" : 500,
                "message": err.message 
            });
        }
        else {
            res.status(200).json({
                "statusCode" : 200,
                "data" : respostas
            });
        }
    });
});

routes.get('/respostas/quantidade', async (req: Request, res : Response) => {
    respostaService.getQuantidades((err : Error, respostasQuantidades : RespostaQuantidadeResponse[]) =>{
        if(err){
            res.status(500).json({
                "statusCode" : 500,
                "message": err.message 
            });
        }
        else {
            res.status(200).json({
                "statusCode" : 200,
                "data" : respostasQuantidades
            });
        }
    });
});

routes.get('/respostas/relatorio-tematico', async (req: Request, res : Response) => {
    respostaService.getRelatorioTematico((err : Error, relatorio : RelatorioResponse) =>{
        if(err){
            res.status(500).json({
                "statusCode" : 500,
                "message": err.message 
            });
        }
        else {
            res.status(200).json({
                "statusCode" : 200,
                "data" : relatorio
            });
        }
    });
});

routes.get('/respostas/relatorio-percentual', async (req: Request, res : Response) => {
    respostaService.getRelatorioPercentual((err : Error, relatorio : RelatorioResponse) =>{
        if(err){
            res.status(500).json({
                "statusCode" : 500,
                "message": err.message 
            });
        }
        else {
            res.status(200).json({
                "statusCode" : 200,
                "data" : relatorio
            });
        }
    });
});

routes.get('/temas/quantidade', async (req: Request, res : Response) => {
    temaService.getRespostasCategorias((err : Error, items : IRelatorioPercentual) =>{
        if(err){
            res.status(500).json({
                "statusCode" : 500,
                "message": err.message 
            });
        }
        else {
            res.status(200).json({
                "statusCode" : 200,
                "data" : items
            });
        }
    });
});


// Para utilização dos testes automatizados este bloco deve estar comentado
const configSwagger = new ConfigSwagger();
routes.use('/api/docs', swaggerUi.serve,
    swaggerUi.setup(configSwagger.swaggerDocument));
// Fim do bloco que deve estar comentado para uso dos testes automatizados
routes.get('/', function (req, res) {
    res.send('Api airPromo on-line');
});

export default routes;