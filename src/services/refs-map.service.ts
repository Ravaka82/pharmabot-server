import {RefsMap} from "../model";
import {TryCatch} from "../utils/error.handler";

export default {

    async create(payload) {
         return TryCatch( async () => await RefsMap.update(
        {
             ...payload
        }, 
        {
            $setOnInsert: await payload
        },
        {
            upsert:  true
        })

        , `Cannot create refs-map.`)
    },
    
    getLast(){
        return TryCatch(() => RefsMap.find({}).sort({_id:-1}).limit(1), `Cannot get last refs_map`);
    },

    getAll() {
        return TryCatch(async () =>  await RefsMap.find(), `Cannot get refs_map`);
    },

    async deleteBulk({input}) {
        return TryCatch(() => RefsMap.deleteMany({_id: input || [] }), `Error for deleting refs_map`);
    },
}

    