import {gql} from "apollo-server-express";

export default gql`
    type Client {
        _id: ID!
        name: String!
        address: String
        city: String
        zip: String
        country: String
        nif: String
        stat: String
        rcs: String
        phoneNumber: String
        officeNumber: String
        logo: String
        createdAt: Date
        updatedAt: Date
    }

    input UpdateClientInput {
        name: String
        address: String
        city: String
        zip: String
        country: String
        nif: String
        stat: String
        rcs: String
        phoneNumber: String
        officeNumber: String
        logo: String
    }

    input AddClientInput {
        name: String!
        address: String
        city: String
        zip: String
        country: String
        nif: String
        stat: String
        rcs: String
        phoneNumber: String
        officeNumber: String
        logo: String
    }

    extend type Query {
        clients: [Client]
    }

    extend type Mutation {
        addClient(input: AddClientInput!): Client
        updateClientById(_id: ID!, changes: UpdateClientInput!): Client
        deleteClientById(_id: ID!): Client
    }
`;
