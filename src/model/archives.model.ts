import * as mongoose from "mongoose";

const ArchivesSchema = new mongoose.Schema({
        designation: {type: String},
        date_expiration: {type: String},
        prix: {type: String},
        tva: {type: String},
        fournisseur: {type: String},
        date_catalogue: {type: String}
    },
    { _id: true }
);
//collection
export default mongoose.model("archive", ArchivesSchema, "archives");