import {gql} from "apollo-server-express";

export default gql`
  type Fournisseur {
    _id: ID!
    name: String
    positionx: String
    positiony: String
    createdAt: Date
    updatedAt: Date
  }

  input UpdateFournisseurInput {
    name: String!
  }

  input AddFournisseurInput {
    name: String!
  }

  extend type Query {
    fournisseurs: [Fournisseur]
  }

  extend type Mutation {
    addFournisseur(input: AddFournisseurInput!): Fournisseur
    addOneFournisseur(id: ID!): Fournisseur
    updateFournisseurById(_id: ID!, changes: UpdateFournisseurInput!): Fournisseur
    deleteFournisseurById(_id: ID!): Fournisseur
  }
`;
