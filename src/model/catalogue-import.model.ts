import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const CatalogueImportModel = new Schema({
        feuille: {type: String},
        designation: {type: String},
        prix: {type: String},
        date_expiration: {type: String, required: false},
        tva: {type: String, required: false},
        isArrivage: {type: Boolean, default: false},
        fournisseur: String,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, required: false },
    },
    { _id: true }
);

export default mongoose.model("catalogue-import", CatalogueImportModel, "catalogue-imports");

