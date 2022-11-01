import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const FacturationSchema = new Schema({
    designation: String,
    quantity: Number,
    price: Number
})

const FactureClientSchema = new Schema({
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
})

const FactureSchema = new Schema({
        reference: { type: String, unique: true },
        sender: FactureClientSchema,
        receiver: FactureClientSchema,
        catalogueGroupe: { type: mongoose.SchemaTypes.ObjectId, ref: 'catalogue-groupe' },
        status: { type: String, enum: ['PAID', 'WAITING', 'CREATED', 'PAY_AVAILABLE']},
        receivedBy: { type: String, required: false },
        receivedAt: { type: Date, required: false },
        paidAt: { type: Date },
        payAvailableAt: { type: Date },
        qrcode: {type: String, required: false },
        metadata: {type: Object, required: false },
        facturation: [FacturationSchema],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, required: false },
    },
    { _id: true }
);

export default mongoose.model("facture", FactureSchema, "factures");

