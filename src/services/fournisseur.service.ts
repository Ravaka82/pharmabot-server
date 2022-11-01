import {Fournisseur} from "../model";
import {TryCatch} from "../utils/error.handler";
import {Catalogue} from "../model";

export default {

    create(payload) {
       return TryCatch(() => {
           payload.updatedAt = new Date();
           return Fournisseur.create(payload)
       }, `Cannot create fournisseur.`);
    },

    async getAll() {
        let data = await Fournisseur.find();
        let result = [];
        for(let d of data){
            d['positionx'] = parseFloat(d['positionx']);
            d['positiony'] = parseFloat(d['positiony']);
            result.push(d);
            console.log(d['positiony']);
        }
        return TryCatch(async () => await result, `Cannot get all fournisseur.`)
    },

    deleteById(id) {
        return TryCatch(() => Fournisseur.findByIdAndDelete(id), `Cannot delete fournisseur.`)
    },

    updateById({_id, changes}) {
        return TryCatch(() => {
            changes.updatedAt = new Date();
            return Fournisseur.findByIdAndUpdate(_id, changes);
        }, `Cannot update fournisseur.`)
    },
    addOneFournisseur(id) {
        let data =  Fournisseur.findById(id);
        return TryCatch(async () => data,`Cannot get all fournisseur.`)
    },
}