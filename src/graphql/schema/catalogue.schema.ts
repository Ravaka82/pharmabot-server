import {gql} from "apollo-server-express";

export default gql`

    scalar Upload

    type Catalogue {
        _id: ID!
        user: String!
        isArrivage: Boolean
        fournisseur: String
        extension: String
        catalogue: String
        createdAt: Date
        updatedAt: Date
    }

    input CatalogueExcelOptionInput {
        feuille: String!
        designation: String!
        prix: String!
        date_expiration: String
        tva: String
        isArrivage: Boolean!
        _id: String
    }

    input CatalogueOptionInput {
        user: String
        isArrivage: Boolean
        fournisseur: String
        date_catalogue: String
        excel: CatalogueExcelOptionInput
    }

    extend type Mutation  {
        uploadCatalogue(file: Upload!, options: CatalogueOptionInput!): Catalogue
        deleteCatalogueById(_id: ID!): Catalogue
    }

    extend type Query {
        catalogues: [Catalogue]
    }
`;
