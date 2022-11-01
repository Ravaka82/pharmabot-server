import {gql} from "apollo-server-express";

export default gql`
    type Archive {
        _id: ID!
        designation: String
        date_expiration: String
        prix: String
        tva: String
        fournisseur: String
        date_catalogue: String
    }
    input UpdateArchiveInput {
        
        designation: String
        date_expiration: String
        prix: String
        tva: String
        fournisseur: String
        date_catalogue: String
    }
    input AddArchiveInput {
        designation: String
        date_expiration: String
        prix: String
        tva: String
        fournisseur: String
        date_catalogue: String
    }

    type ResultAddDesignation{
        _id: String
        fournisseur: String
        date_catalogue: String
        prix: String
    }
    
    type JsonCatalogue{
        _id: String
        designation: String
        date_expiration: String
        prix: String
        tva: String
        fournisseur: String
        date_catalogue: String
    }
        
    type deleteArchive {
        ok: Int
        deletedCount: Int
    }
    extend type Query {
        archives: [Archive]
    }
    extend type Mutation {
        addOneDesignation(designation: String!,dateStart: String!,dateEnd: String!): [ResultAddDesignation]
        addCommonName(commonName: String!,dateStart: String!,dateEnd: String!):[ResultAddDesignation]
        addArchive(input: AddArchiveInput!): Archive
        updateArchiveById(_id: ID!, changes: UpdateArchiveInput!): Archive
        deleteArchiveById(input: [ID]!): deleteArchive
        addJsonCatalogue(dateStart: String!,dateEnd: String!): [JsonCatalogue]
    }
`;
