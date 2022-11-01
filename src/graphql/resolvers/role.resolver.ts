import {RoleService} from "../../services";

export default {
    Query: {
        roles: async () => await RoleService.getAll()
    },
    Mutation: {
        addRole: async (_, {input}) => await RoleService.create(input),
        updateRoleById: async (_, {_id, changes}) => await RoleService.updateById({_id, changes}),
        deleteRoleById: async (_, {_id}) => await RoleService.deleteById({_id}),
    }
}
