import {Catalogue} from "../model";
import {self as ExcelService} from './excel.service';
import {self as UploadService} from './upload.service';
import * as path from "path";
import {TryCatch} from "../utils/error.handler";

export default {

    create(payload) {
        return TryCatch(() => {
            payload.updatedAt = new Date();
            return Catalogue.create(payload);
        }, `Cannot create catalogue.`)
    },

    getAll() {
        return TryCatch(() => Catalogue.find(), `Cannot get all catalogue.`);
    },

    getById(id) {
        return TryCatch(() => Catalogue.findById(id), `Cannot get catalogue.`);
    },

    async deleteById(id) {
        return TryCatch(async () => {
            const catalogue = await this.getById(id);
            const excelFilename = `${catalogue.catalogue.replace(/\//g, '-')}.${catalogue.extension}`;
            const jsonFilename = `${catalogue.catalogue.replace(/\//g, '-')}.json`;
            const originalFilePath = path.resolve(process.cwd(), 'upload', 'original', catalogue.fournisseur, excelFilename);
            const jsonFilePath = path.resolve(process.cwd(), 'upload', 'json', catalogue.fournisseur, jsonFilename);
            // Remove original file
            UploadService.delete(originalFilePath)
            // Remove json file
            UploadService.delete(jsonFilePath)
            return Catalogue.findByIdAndDelete(id);
        }, 'Error deleting catalogue.');
    },

    async uploadCatalogue({file}, options) {
        return TryCatch(async () => {
            const fileName =  `${options.date_catalogue.replace(/\//g, '-')}`;
            const filepath = await UploadService.upload(file, `original/${options.fournisseur}`, fileName);
            const rows = await ExcelService.buildDTO(filepath, options);
            const isArrivage = options.excel?.isArrivage || false;
            await ExcelService.exportJSON(rows, `${fileName}.json`, `upload/${isArrivage ? 'arrivage' : 'json'}/${options.fournisseur}`);

            const data = {
                user: options.user,
                fournisseur: options.fournisseur,
                catalogue: options.date_catalogue,
                extension: filepath.split('.').pop(),
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const catalogue = await Catalogue.findOne({
                fournisseur: options.fournisseur,
                catalogue: options.date_catalogue,
                isArrivage
            });
            if (catalogue) {
                return Catalogue.findOneAndUpdate({_id: catalogue._id}, data, {new: true})
            }
            return Catalogue.create(data)
        }, `Error uploading catalogue.`)

    }
}

