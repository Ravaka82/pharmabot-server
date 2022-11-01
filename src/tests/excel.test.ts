import {ExcelService} from "../services";

const filepath = '/src/tests/assets/PARAMAD.xlsx';

const rows = ExcelService.buildDTO(filepath, {
    excel: {
        feuille: 'LEA NATURE',
        designation: 'A',
        prix: '',
        date_expiration: '',
        tva: ''
    }
});
// TasksService.exportJSON(rows, '090921.json', 'upload')
console.log('Rows', rows);
