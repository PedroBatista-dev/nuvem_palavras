import doteenv from "dotenv";
import { Auth } from './auth';

doteenv.config();

export const validaParamLogin = (user : Auth, callback : Function) => {
    if (user.login != process.env.USER){
        callback(false, "Parâmetro login incorreto");
    }
    else if (user.password != process.env.PASSWORD) {
        callback(false, "Parâmetro senha incorreto");
    }
    else {
        callback(true, "Parâmetros validados com sucesso");
    }
}