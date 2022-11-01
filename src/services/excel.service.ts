import * as XLSX from 'xlsx';
import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';

export const self = {
    readExcel(filepath: string, {excel: {feuille: sheetName}}): any {
        let workbook = XLSX.readFile(`${process.cwd()}${filepath}`);
        return workbook.Sheets[sheetName];
    },

    getUsedColumns(ws: XLSX.WorkSheet): string[] {
        const availableColumn = [];
        for (const key of Object.keys(ws)) {
            if (key.match(/^[a-zA-Z]+/g)) {
                const letterColumn = key.match(/[^0-9]/g)[0];
                if (availableColumn.indexOf(letterColumn) < 0) {
                    availableColumn.push(letterColumn);
                }
            }
        }
        return availableColumn.sort().sort((a, b) => {
            return a.length < b.length ? -1 : 1;
        });
    },

    reverseMapping(obj: Object): Object {
        const newObj = {};
        if (typeof obj === 'object') {
            for (const [key, value] of Object.entries(obj)) {
                if (value) {
                    newObj[value] = key;
                }
            }
        }
        return newObj
    },

    buildDTO(filepath, options): any[] {
        const ws = self.readExcel(filepath, options);
        const allColumns = self.getUsedColumns(ws);
        const col = self.reverseMapping(options.excel);
        const res = {};

        for (const [key, value] of Object.entries(ws)) {
            const firstKey = key.charAt(0);
            let v = (value as any).w;

            if (allColumns.indexOf(firstKey) > -1) {
                const columnLetter = key.match(/[^0-9]/g)[0];
                const row: number = Number(key.match(/[0-9]+/g)[0]);

                switch(col[columnLetter]) {
                    case 'prix':
                        v = (value as any).v;
                        break
                    default:
                        v = v && v.replace(/\s+/g, ' ').trim();
                        break
                }

                if (col[columnLetter]) {
                    _.set(res, [row, col[columnLetter]], v);
                }
                // _.set(res, [row, 'arrivage'], options.arrivage);
            }
        }

        return (Object.values(res) as any)
            .filter(row =>
                typeof row.designation === 'string' &&
                typeof row.prix === 'number'
                // typeof row.date_expiration === 'string'
            );
    },

    exportJSON(dto: any[], filename: string, outputPath: string) {
        outputPath = path.join(process.cwd(), outputPath);
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, {recursive: true});
        }
        return fs.writeFileSync(path.join(outputPath, filename), JSON.stringify(dto, null, 4))
    }
}

