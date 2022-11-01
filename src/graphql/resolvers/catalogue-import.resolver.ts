import {CatalogueImportService} from "../../services";

export default {
    Query: {
        catalogueImports: async () => await CatalogueImportService.getAll()
    },
    Mutation: {
        addCatalogueImport: async (_, {input}) => await CatalogueImportService.create(input),
        updateCatalogueImportById: async (_, {_id, changes}) => await CatalogueImportService.updateById({_id, changes}),
        deleteCatalogueImportById: async (_, {_id}) => await CatalogueImportService.deleteById({_id}),
    }
}
