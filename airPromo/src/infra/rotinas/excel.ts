export function ajustarColunasExcel(workSheet: any) {
    workSheet.columns.forEach((column: any) => {
        if (column.values) {
            const lengths = column.values.map((v: any) => {
                if (v)
                    return v.toString().length
                else
                    return 0
            });
            const maxLength = Math.max(...lengths.filter((v: any) => typeof v === 'number')) + 2;
            column.width = maxLength;
        }
    });
}