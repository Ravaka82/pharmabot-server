import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const FournisseurSchema = new Schema({
        name: String,
        positionx: String,
        positiony: String,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, required: false },
    },
    { _id: true }
);
export default mongoose.model("fournisseur", FournisseurSchema, "fournisseurs");

