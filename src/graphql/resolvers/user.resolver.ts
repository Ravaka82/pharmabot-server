import {UserService} from "../../services";

export default {
    Query: {
        users: async () => await UserService.getAll(),
        user: async (_, {id}) => await UserService.getById(id)
    },
    Mutation: {
        login: async (_, {input}) => await UserService.login(input),
        logout: async (_, {input}) => await UserService.logout(input),
        validateToken: async (_, {input}) => await UserService.validateToken(input),
        addUser: async (_, {input}) => await UserService.create(input),
        updateUserById: async (_, {_id, changes}) => await UserService.updateById({_id, changes}),
        deleteUserById: async (_, {_id}) => await UserService.deleteById({_id}),
    }
}
