import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const CatalogueSettingsSchema = new Schema({
        catalogueGroupeId: { type: mongoose.SchemaTypes.ObjectId, ref: 'catalogue-groupe', required: false },
        fournisseurId: { type: mongoose.SchemaTypes.ObjectId, ref: 'fournisseurs', required: false },
        couleur: { type: String, required: false },
        remise: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, required: false },
    },
    { _id: true }
);

export default mongoose.model("catalogue-setting", CatalogueSettingsSchema, "catalogue-settings");
