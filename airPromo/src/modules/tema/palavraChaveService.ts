import { RowDataPacket } from "mysql2";
import dbconnection from "../../infra/server/dbconnection";
import * as respostaTemaService from "../respostas/respostaTemaService";

export const buscarTemas = (palavras: string[], codigoResposta: number) => {
    const temasIncluidos: number[] = [] 
    for (let palavra of palavras) {
        const query = "SELECT CodigoTema FROM PalavrasChaves WHERE Descricao = ? "

        dbconnection.query(
            query,
            [palavra],
            (err, result) => {
                if (err) {
                    console.log(err.message ? err.message : err)
                };
    
                const rows = <RowDataPacket[]>result;
                if (rows.length > 0 && !temasIncluidos.includes(rows[0].CodigoTema)) {
                    temasIncluidos.push(rows[0].CodigoTema);
                    respostaTemaService.postRespostaTema({
                        CodigoResposta: codigoResposta, 
                        CodigoTema: rows[0].CodigoTema
                    })
                }
            }
        );
    }
    return true
}