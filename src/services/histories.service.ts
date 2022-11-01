import {Histories} from "../model";
import {TryCatch} from "../utils/error.handler";

export default {

    async create(payload = []) {
        return TryCatch(async () => {
            const histories: any = await Histories.insertMany(payload);
            const _histories = histories.map(h => h._id);
            return Histories.find({ _id: { $in: _histories }}).populate('user')
        }, `Error for creating histories`);
    },

    getAll() {
        return TryCatch(() => Histories.find().populate('user'), `Cannot get histories`);
    },

    async deleteBulk({input}) {
        return TryCatch(() => Histories.deleteMany({_id: input || [] }), `Error for deleting histories`);
    },
}

