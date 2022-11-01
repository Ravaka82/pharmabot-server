import {CatalogueService} from "../../services";

export default {
    Query: {
        catalogues: async () => await CatalogueService.getAll()
    },
    Mutation: {
        uploadCatalogue: async (_, {file, options}) => await CatalogueService.uploadCatalogue(file, options),
        deleteCatalogueById: async(_, {_id}) => await CatalogueService.deleteById({_id})
    }
}
