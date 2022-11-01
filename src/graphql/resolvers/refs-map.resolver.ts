import {RefsMapService} from "../../services";

export default {
    Query: {
        refsMap: async () => await RefsMapService.getAll(),
        findLastRefsMap: async() => await RefsMapService.getLast()
    },
    Mutation: {
        addRefsMap: async (_, {input}) => await RefsMapService.create(input),
        deleteRefsMapById: async (_, {input}) => await RefsMapService.deleteBulk({input}),
    }
}

