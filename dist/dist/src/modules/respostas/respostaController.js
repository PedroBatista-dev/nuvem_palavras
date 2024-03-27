"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarPostResposta = void 0;
exports.validarPostResposta = (data, callback) => {
    if (!data.Texto || data.Texto == '') {
        callback(false, "Parâmetro Texto é obrigatório");
    }
    else if (data.Texto.length > 500) {
        callback(false, "O texto da resposta deve conter no máximo 500 caracteres");
    }
    else {
        callback(true, "Parâmetros validados com sucesso");
    }
};
