import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const ClientSchema = new Schema({
        name: String,
        address: { type: String, required: false },
        city: { type: String, required: false },
        zip: { type: String, required: false },
        country: { type: String, required: false },
        nif: { type: String, required: false },
        stat: { type: String, required: false },
        rcs: { type: String, required: false },
        phoneNumber: { type: String, required: false },
        officeNumber: { type: String, required: false },
        logo: { type: String, required: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, required: false },
    },
    { _id: true }
);

export default mongoose.model("client", ClientSchema, "clients");

