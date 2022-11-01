import {Client} from "../model";
import {TryCatch} from "../utils/error.handler";

export default {

    create(payload) {
        return TryCatch(() => {
            console.log('CREATE FACTURE', payload)
            payload.updatedAt = new Date();
            return Client.create(payload)
        }, `Cannot create client.`)
    },

    getAll() {
        return TryCatch(() => Client.find(), `Cannot get all clients.`)
    },

    deleteById(id) {
        return TryCatch(() => Client.findByIdAndDelete(id), `Cannot delete client.`)
    },

    updateById({_id, changes}) {
        return TryCatch(() => {
            changes.updatedAt = new Date();
            return Client.findByIdAndUpdate(_id, changes);
        }, `Cannot update client.`)
    }
}

