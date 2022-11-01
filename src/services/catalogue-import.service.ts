import {CatalogueImport} from "../model";
import {TryCatch} from "../utils/error.handler";

export default {

    create(payload) {
        return TryCatch(() => {
            payload.updatedAt = new Date();
            return CatalogueImport.create(payload)
        }, `Cannot create catalogue-import.`);
    },

    getAll() {
        return TryCatch(() => CatalogueImport.find(), `Cannot get all catalogue-import.`)
    },

    deleteById(id) {
        return TryCatch(() => CatalogueImport.findByIdAndDelete(id), `Cannot delete catalogue-import.`)
    },

    updateById({_id, changes}) {
        return TryCatch(() => {
            changes.updatedAt = new Date();
            return CatalogueImport.findByIdAndUpdate(_id, changes);
        }, `Cannot update catalogue-import.`)
    },
}

