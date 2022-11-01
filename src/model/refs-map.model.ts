import * as mongoose from "mongoose";
import * as Mongoose from "mongoose";

const Schema = mongoose.Schema;
const RefsMapSchema = new Schema({
    name: {type: String},
    },
{ _id: true }
);
//collection
export default mongoose.model("refsMap", RefsMapSchema, "refsMaps");