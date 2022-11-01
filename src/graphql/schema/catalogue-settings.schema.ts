import {gql} from "apollo-server-express";

export default gql`
    type CatalogueSettings {
        _id: ID!
        catalogueGroupeId: String
        fournisseurId: String
        remise: Float
        couleur: String
        createdAt: Date
        updatedAt: Date
    }

    input UpdateCatalogueSettingsInput {
        fournisseurId: String
        remise: Float
        couleur: String
    }
    
    input AddCatalogueSettingsInput {
        catalogueGroupeId: String!
    }
    
    input catalogueSettingsByGroupeIdInput {
        catalogueGroupeId: String!
    }

    extend type Query {
        catalogueSettings: [CatalogueSettings]
        catalogueSettingsByGroupeId(input: catalogueSettingsByGroupeIdInput!): [CatalogueSettings]
    }

    extend type Mutation {
        addCatalogueSettings(input: AddCatalogueSettingsInput!): CatalogueSettings
        updateCatalogueSettingsById(_id: ID!, changes: UpdateCatalogueSettingsInput!): CatalogueSettings
        deleteCatalogueSettingsById(_id: ID!): CatalogueSettings
    }
`;
