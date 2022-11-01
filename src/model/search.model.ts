import * as mongoose from "mongoose";
import * as Mongoose from "mongoose";

const Schema = mongoose.Schema;
const KeywordSchema = new Schema({
    keyword: String,
    at: String
})
const SearchSchema = new Schema({
        user: { type: Mongoose.SchemaTypes.ObjectId, ref: 'users' },
        history: String,
        searches: [KeywordSchema],
        createdAt: { type: Date, default: Date.now }
    },
    { _id: true }
);

export default mongoose.model("search", SearchSchema, "searches");

