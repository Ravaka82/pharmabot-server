import {CatalogueGroupe} from "../model";
import {TryCatch} from "../utils/error.handler";

export default {

    create(payload) {
        return TryCatch(() => {
            payload.updatedAt = new Date();
            return CatalogueGroupe.create(payload)
        }, `Cannot create catalogue-groupe.`)
    },

    getAll() {
        return TryCatch(() => CatalogueGroupe.find(), `Cannot get all catalogue-groupe.`)
    },

    deleteById(id) {
        return TryCatch(() => CatalogueGroupe.findByIdAndDelete(id), `Cannot delete catalogue-groupe.`)
    },

    updateById({_id, changes}) {
       return TryCatch(() => {
           changes.updatedAt = new Date();
           return CatalogueGroupe.findByIdAndUpdate(_id, changes);
       }, `Cannot update catalogue-groupe.`)
    }
}

