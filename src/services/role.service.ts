import {Role} from "../model";
import {TryCatch} from "../utils/error.handler";

export default {
    generateKeyByName(name: string): string {
        return name.toUpperCase().replace(/\ /g, '_');
    },

    create(payload) {
        return TryCatch(() => {
            const role: any = new Role();
            role.name = this.generateKeyByName(payload.name);
            role.updatedAt = new Date();
            return role.save();
        }, `Cannot create role.`)
    },

    getAll() {
        return TryCatch(() => Role.find(), `Cannot get all role.`)
    },

    updateById({_id, changes}) {
        return TryCatch(() => {
            changes.updatedAt = new Date();
            return Role.findByIdAndUpdate(_id, changes);
        }, `Cannot update role.`)
    },

    deleteById({_id}) {
        return TryCatch(() => Role.findByIdAndDelete(_id), `Cannot delete role.`)
    },
}
