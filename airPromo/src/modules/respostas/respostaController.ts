import { Resposta } from "./resposta";

export const validarPostResposta = (data: Resposta, callback: Function) => {
    if (!data.Texto || data.Texto == ''){
        callback(false, "Parâmetro Texto é obrigatório");
    }
    else if (data.Texto.length > 500) {
        callback(false, "O texto da resposta deve conter no máximo 500 caracteres");
    }
    else {
        callback(true, "Parâmetros validados com sucesso");
    }
}