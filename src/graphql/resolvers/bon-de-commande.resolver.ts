import {BonDeCommandeService} from "../../services";

export default {
    Query: {
        bonDeCommandes: async () => await BonDeCommandeService.getAll(),
      
    },
    Mutation: {
        addBonDeCommandeById: async (_, {input}) => await BonDeCommandeService.create(input),
        updateBonDeCommandeById: async (_, {_id, changes}) => await BonDeCommandeService.updateById({_id, changes}),
        deleteBonDeCommandeById: async (_, {_id}) => await BonDeCommandeService.deleteById({_id}),
        sender: async(_, {to, subject,text,file,filename}) => await BonDeCommandeService.sender({to,subject,text,file,filename}),
        // singleUpload: async(_, {file}) => await BonDeCommandeService.readFile(file)
    }
}
