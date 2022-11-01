import {ClientService} from "../../services";

export default {
    Query: {
        clients: async () => await ClientService.getAll()
    },
    Mutation: {
        addClient: async (_, {input}) => await ClientService.create(input),
        updateClientById: async (_, {_id, changes}) => await ClientService.updateById({_id, changes}),
        deleteClientById: async (_, {_id}) => await ClientService.deleteById({_id}),
    }
}
