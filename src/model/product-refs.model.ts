import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const ProductRefsSchema = new Schema({
            nameProduct: String,
            refsMap: { type: mongoose.SchemaTypes.ObjectId, ref: 'refsMap', required: true },
   },
    { _id: true }
);

export default mongoose.model("productRef", ProductRefsSchema, "productRefs");

