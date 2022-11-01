import {SearchService} from "../../services";

export default {
    Query: {
        searches: async () => await SearchService.getAll(),
        countOccurence: async ()=> await SearchService.countOccurence(),
       
    },
    Mutation: {
        addSearch: async (_, {input}) => await SearchService.create(input),
        addOccurenceByMonth: async (_, {month,nombre})=> await SearchService.addOccurenceByMonth(month,nombre)
    }
}
