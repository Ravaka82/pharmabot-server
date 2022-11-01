import {gql} from "apollo-server-express";

export default gql`
scalar Upload 

type BonDeCommande {
    _id: ID!
    fournisseur: Fournisseur
    archive: Archive
    quantite: String
    createdAt: Date
    updatedAt: Date
}

input UpdateBonDeCommandeInput {
    fournisseur: ID!
    archive: ID!
    quantite: String
}

input AddBonDeCommandeInput  {
    fournisseur: ID!
    archive: ID!
    quantite: String
}
type reponse{
    statu: String
}
type SuccessMessage{
    message: String
}
extend type Query {
    bonDeCommandes: [BonDeCommande],
   
}

extend type Mutation {
    addBonDeCommandeById(input: AddBonDeCommandeInput!): BonDeCommande
    updateBonDeCommandeById(_id: ID!, changes: UpdateBonDeCommandeInput!): BonDeCommande
    deleteBonDeCommandeById(_id: ID!): BonDeCommande
    sender(to:String,subject:String,text:String,file:Upload,filename:String):reponse
    singleUpload(file: Upload!): SuccessMessage
}
`;
