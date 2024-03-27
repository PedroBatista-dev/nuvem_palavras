"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ajustarColunasExcel = void 0;
function ajustarColunasExcel(workSheet) {
    workSheet.columns.forEach((column) => {
        if (column.values) {
            const lengths = column.values.map((v) => {
                if (v)
                    return v.toString().length;
                else
                    return 0;
            });
            const maxLength = Math.max(...lengths.filter((v) => typeof v === 'number')) + 2;
            column.width = maxLength;
        }
    });
}
exports.ajustarColunasExcel = ajustarColunasExcel;
