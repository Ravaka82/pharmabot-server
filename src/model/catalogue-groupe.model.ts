import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const CatalogueGroupeSchema = new Schema({
        name: String,
        active: { type: Boolean, default: false },
        fournisseurs: { type: [mongoose.SchemaTypes.ObjectId], ref: 'fournisseurs', required: false },
        users: { type: [mongoose.SchemaTypes.ObjectId], ref: 'users', required: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, required: false },
    },
    { _id: true }
);

export default mongoose.model("catalogue-groupe", CatalogueGroupeSchema, "catalogue-groupes");

