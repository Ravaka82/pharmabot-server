import {CatalogueSettings} from "../model";
import {TryCatch} from "../utils/error.handler";

export default {

    create(payload) {
        return TryCatch(() => {
            payload.updatedAt = new Date();
            return CatalogueSettings.create(payload)
        }, `Cannot create catalogue-setting.`)
    },

    getAll() {
        return TryCatch(() => CatalogueSettings.find(), `Cannot get all catalogue-setting.`);
    },

    getByCatalogueGroupeId({catalogueGroupeId}) {
      return TryCatch(() => CatalogueSettings.find({catalogueGroupeId}), `Cannot get catlaogue-setting by catalogue groupe.`)
    },

    deleteById(id) {
        return TryCatch(() => CatalogueSettings.findByIdAndDelete(id), `Cannot delete catalogue-setting`);
    },

    updateById({_id, changes}) {
        return TryCatch(() => {
            changes.updatedAt = new Date();
            return CatalogueSettings.findByIdAndUpdate(_id, changes);
        }, `Cannot update catalogue setting.`)
    }
}

