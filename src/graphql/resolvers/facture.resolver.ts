import {FactureService} from "../../services";

export default {
    Query: {
        factures: async (_, {query}) => await FactureService.getAll(query),
        viewFacture: async (_, {_id}) => await FactureService.get({_id})
    },
    Mutation: {
        addFacture: async (_, {input}) => await FactureService.create(input),
        updateFactureById: async (_, {_id, changes}) => await FactureService.updateById({_id, changes}),
        deleteFactureById: async (_, {_id}) => await FactureService.deleteById({_id}),
    }
}
