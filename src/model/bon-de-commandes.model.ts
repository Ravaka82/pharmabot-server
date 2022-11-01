import * as mongoose from "mongoose";
import * as Mongoose from "mongoose";

const Schema = mongoose.Schema;
const BonDeCommandeSchema = new Schema({
        fournisseur: { type: Mongoose.SchemaTypes.ObjectId, ref: 'fournisseur' },
        archive:{ type: Mongoose.SchemaTypes.ObjectId, ref: 'archive' },
        quantite: String,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, required: false },
    },
    { _id: true }
);

export default mongoose.model("bon-de-commande", BonDeCommandeSchema, "bon-de-commandes");

