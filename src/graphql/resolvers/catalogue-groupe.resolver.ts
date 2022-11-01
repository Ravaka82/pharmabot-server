import {CatalogueGroupeService} from "../../services";

export default {
    Query: {
        catalogueGroupes: async () => await CatalogueGroupeService.getAll()
    },
    Mutation: {
        addCatalogueGroupe: async (_, {input}) => await CatalogueGroupeService.create(input),
        updateCatalogueGroupeById: async (_, {_id, changes}) => await CatalogueGroupeService.updateById({_id, changes}),
        deleteCatalogueGroupeById: async (_, {_id}) => await CatalogueGroupeService.deleteById({_id}),
    }
}
