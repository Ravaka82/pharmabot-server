import {FournisseurService} from "../../services";

export default {
    Query: {
        fournisseurs: async () => await FournisseurService.getAll(),
     
    },
    Mutation: {
        addFournisseur: async (_, {input}) => await FournisseurService.create(input),
        updateFournisseurById: async (_, {_id, changes}) => await FournisseurService.updateById({_id, changes}),
        deleteFournisseurById: async (_, {_id}) => await FournisseurService.deleteById({_id}),
        addOneFournisseur: async (_, {id}) => await FournisseurService.addOneFournisseur(id),
    }
}
