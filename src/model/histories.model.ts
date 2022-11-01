import * as mongoose from "mongoose";
import * as Mongoose from "mongoose";

const Schema = mongoose.Schema;
const HistoriesSchema = new Schema({
        user: { type: Mongoose.SchemaTypes.ObjectId, ref: 'users', required: false },
        description: { type: String, required: false },
        metadata: { type: Object, required: false },
        action: { type: String, enum: ['LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'SEARCH'] },
        createdAt: { type: Date, default: Date.now }
    },
    { _id: true }
);

export default mongoose.model("history", HistoriesSchema, "histories");

