import * as mongoose from "mongoose";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
        pseudo: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        connected: { type: Boolean, default: false },
        role: { ref: 'roles', type: mongoose.SchemaTypes.ObjectId, required: false },
        catalogueGroupe: { ref: 'catalogue-groupe', type: mongoose.SchemaTypes.ObjectId, required: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, required: false },
    },
    { _id: true }
);

export default mongoose.model("users", UserSchema);
