import {ProductRefsService} from "../../services";

export default {
    Query: {
        productRefs: async () => await ProductRefsService.getAll()
    },
    Mutation: {
        addProductRefs: async (_, {input}) => await ProductRefsService.create(input),
        deleteProduct: async (_, {_id}) => await ProductRefsService.deleteById({_id}),
         }
}
