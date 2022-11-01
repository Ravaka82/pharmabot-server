import * as mongoose from "mongoose";

let Schema = mongoose.Schema;

let RolesSchema = new Schema({
        name: { type: String, required: true },
        pages: { type: [String], required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, required: false },
    },
    { _id: true }
);

export default mongoose.model("roles", RolesSchema);
