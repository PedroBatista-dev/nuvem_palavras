import { OkPacket } from "mysql2";
import dbconnection from "../../infra/server/dbconnection";
import { RespostaTema } from "./respostaTema";

export const postRespostaTema = (data: RespostaTema) => {
    const queryString = "INSERT INTO `RespostasTemas`(`CodigoTema`, `CodigoResposta`) " +
                        "VALUES (?, ?)"

    dbconnection.query(
        queryString,
        [data.CodigoTema, data.CodigoResposta],
        (err, result) => {
            if (err) {
                console.log(err.message ? err.message : err)
            };

            const insertId = (<OkPacket>result).insertId;
            return insertId;
        }
    );
}