import {gql} from "apollo-server-express";

export default gql`
    type CatalogueGroupe {
        _id: ID!
        active: Boolean
        name: String
        fournisseurs: [String]
        createdAt: Date
        updatedAt: Date
    }

    input UpdateCatalogueGroupeInput {
        name: String
        active: Boolean
        fournisseurs: [String]
    }

    input AddCatalogueGroupeInput {
        name: String!
    }

    extend type Query {
        catalogueGroupes: [CatalogueGroupe]
    }

    extend type Mutation {
        addCatalogueGroupe(input: AddCatalogueGroupeInput!): CatalogueGroupe
        updateCatalogueGroupeById(_id: ID!, changes: UpdateCatalogueGroupeInput!): CatalogueGroupe
        deleteCatalogueGroupeById(_id: ID!): CatalogueGroupe
    }
`;
