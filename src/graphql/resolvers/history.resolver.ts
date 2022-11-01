import {HistoriesService} from "../../services";

export default {
    Query: {
        histories: async () => await HistoriesService.getAll()
    },
    Mutation: {
        addHistory: async (_, {input}) => await HistoriesService.create(input),
        deleteHistories: async (_, {input}) => await HistoriesService.deleteBulk({input}),
    }
}
