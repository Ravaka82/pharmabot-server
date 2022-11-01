import {gql} from "apollo-server-express";

export default gql`
    type CatalogueImport {
        _id: ID!
        feuille: String
        designation: String
        prix: String
        date_expiration: String
        tva: String
        isArrivage: Boolean
        fournisseur: String
        createdAt: Date
        updatedAt: Date
    }

    input UpdateCatalogueImportInput {
        feuille: String
        designation: String
        prix: String
        date_expiration: String
        tva: String
        isArrivage: Boolean
        fournisseur: String
    }

    input AddCatalogueImportInput {
        feuille: String!
        designation: String!
        prix: String!
        date_expiration: String
        tva: String
        isArrivage: Boolean
        fournisseur: String!
    }

    extend type Query {
        catalogueImports: [CatalogueImport]
    }

    extend type Mutation {
        addCatalogueImport(input: AddCatalogueImportInput!): CatalogueImport
        updateCatalogueImportById(_id: ID!, changes: UpdateCatalogueImportInput!): CatalogueImport
        deleteCatalogueImportById(_id: ID!): CatalogueImport
    }
`;
