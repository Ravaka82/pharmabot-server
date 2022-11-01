import {ProductRefs, RefsMap} from "../model";
import {TryCatch} from "../utils/error.handler";

export default {

    async create(payload = []) {
        return TryCatch(async () => {
            const product_refs: any = await ProductRefs.insertMany(payload);
            const _product_ref = product_refs.map(h => h._id);
            return ProductRefs.find({ _id: { $in: _product_ref }}).populate('refsMap')
        }, `Error for creating product_refs`);
    },

    getAll() {
        return TryCatch(() => ProductRefs.find().populate('refsMap'), `Cannot get product_refs`);
    },

    async deleteById(id) {
        return TryCatch(async () => await ProductRefs.findByIdAndDelete(id), `Cannot delete product_refs.`)
      },
}

