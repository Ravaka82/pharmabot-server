import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const CatalogueSchema = new Schema({
            fournisseur: String,
            user: { type: mongoose.SchemaTypes.ObjectId, ref: 'users', required: true },
            isArrivage: { type: Boolean, default: false },
            catalogue: String,
            extension: String,
            createdAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, required: false },
    },
    { _id: true }
);

export default mongoose.model("catalogue", CatalogueSchema, "catalogues");

