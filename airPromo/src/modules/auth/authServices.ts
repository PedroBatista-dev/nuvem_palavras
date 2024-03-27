import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

export const login = (callback: Function) => {
    dotenv.config();
    try {
        const token = jwt.sign({autenticado: true }, String(process.env.SECRET), {
            expiresIn: "15h" // Token com duração de 15 min
            });
        callback(null, token);
    }
    catch (err) {
        callback(err, '');
    }
}