import {ArchiveService} from "../../services";

export default {
    Query: {
        archives: async () => await ArchiveService.getAll(),
    },
    Mutation: {
        addOneDesignation: async(_,{designation,dateStart,dateEnd}) => await ArchiveService.addOneDesignation(designation,dateStart,dateEnd),
        addCommonName: async(_,{commonName,dateStart,dateEnd}) => await ArchiveService.addCommonName(commonName,dateStart,dateEnd),
        addArchive: async (_, {input}) => await ArchiveService.create(input),
        updateArchiveById: async (_, {_id, changes}) => await ArchiveService.updateById({_id, changes}),
        deleteArchiveById: async (_, {input}) => await ArchiveService.deleteBulk({input}),
        addJsonCatalogue :  async (_, {dateStart, dateEnd}) =>  await ArchiveService.addJsonCatalogue(dateStart, dateEnd)
    }
}
