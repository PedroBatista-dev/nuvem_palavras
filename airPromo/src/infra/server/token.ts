import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode'
import { Request, Response } from "express";
import doteenv from "dotenv";

export interface MyToken {
    userCode: number;
}

doteenv.config();

//Token deveria puxar do env
export function ValidaToken(req: Request, res: Response,next: Function) {
    const token = <string>req.headers['x-access-token'];
    var erro : string;
    erro = "";
    if (!token) {
        return res.status(401).json({
            "auth": false,
            "message": 'Token não inserido'
        });
    }
    try {
        jwt.verify(token, String(process.env.SECRET), function (err) {
            if (err) {
                erro = err.message;
                return res.status(401).json({
                    "auth": false,
                    "message": 'Falha na Autenticação do token.'
                });
            }
            else {
                const response = jwt_decode<MyToken>(token)
//                req.body.autenticado = response.autenticado;
            }
        });
        if (erro == ""){
            next(); 
        }
    }catch(E) {
        if (E instanceof Error) {
            E.message
        }
    }

}