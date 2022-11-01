import {gql} from "apollo-server-express";

export default gql`
    type Facture {
        _id: ID!
        reference: String
        sender: FactureClient
        receiver: FactureClient
        catalogueGroupe: CatalogueGroupe
        status: String
        receivedBy: String
        receivedAt: Date
        paidAt: Date
        payAvailableAt: Date
        qrcode: String
        metadata: Any
        facturation: [Facturation]
        createdAt: Date
        updatedAt: Date
    }
    
    type FactureClient {
        address: String
        city: String
        country: String
        logo: String
        name: String
        nif: String
        officeNumber: String
        phoneNumber: String
        rcs: String
        stat: String
        zip: String
    }

    input FactureClientInput {
        address: String
        city: String
        country: String
        logo: String
        name: String
        nif: String
        officeNumber: String
        phoneNumber: String
        rcs: String
        stat: String
        zip: String
    }

    type Facturation {
        designation: String
        quantity: Int
        price: Int
    }

    input FacturationInput {
        designation: String
        quantity: Int
        price: Int
    }
    
    input UpdateFactureInput {
        status: String
        receivedBy: String
        receivedAt: Date
        paidAt: Date
        payAvailableAt: Date
        metadata: Any
    }

    input AddFactureInput {
        reference: String,
        sender: FactureClientInput
        receiver: FactureClientInput
        catalogueGroupe: String
        status: String
        metadata: Any
        facturation: [FacturationInput],
    }
    
    input FactureGetQuery {
        catalogueGroupe: String
    }

    extend type Query {
        factures(query: FactureGetQuery): [Facture]
        viewFacture(_id: String): Facture
    }

    extend type Mutation {
        addFacture(input: AddFactureInput!): Facture
        updateFactureById(_id: ID!, changes: UpdateFactureInput!): Facture
        deleteFactureById(_id: ID!): Facture
    }
`;
