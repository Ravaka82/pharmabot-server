import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const TemplateSchema = new Schema({
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, required: false },
    },
    { _id: true }
);

export default mongoose.model("template", TemplateSchema, "templates");
