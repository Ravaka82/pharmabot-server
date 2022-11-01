import {CatalogueSettingsService} from "../../services";

export default {
    Query: {
        catalogueSettings: async () => await CatalogueSettingsService.getAll(),
        catalogueSettingsByGroupeId: async (_, {input}) => await CatalogueSettingsService.getByCatalogueGroupeId(input)
    },
    Mutation: {
        addCatalogueSettings: async (_, {input}) => await CatalogueSettingsService.create(input),
        updateCatalogueSettingsById: async (_, {_id, changes}) => await CatalogueSettingsService.updateById({_id, changes}),
        deleteCatalogueSettingsById: async (_, {_id}) => await CatalogueSettingsService.deleteById({_id}),
    }
}
