import {gql} from "apollo-server-express";

export default gql`
    type User {
        _id: ID!
        pseudo: String
        password: String
        connected: Boolean
        role: Role
        createdAt: Date
        updatedAt: Date
        token: String
        catalogueGroupe: ID
    }
    type TokenValid {
        valid: Boolean!
        user: User
    }

    input LoginInput {
        pseudo: String!
        password: String!
    }

    input LogoutInput {
        token: String!
        _id: String!
    }

    input AddUserInput {
        pseudo: String!
        password: String!
        catalogueGroupe: String!
        role: String!
    }

    input UpdateUserInput {
        pseudo: String
        password: String
        connected: Boolean
        role: String
        catalogueGroupe: String
    }

    extend type Query {
        users: [User]!
        user(id: String!): User
    }

    extend type Mutation {
        login(input: LoginInput!): User!
        logout(input: LogoutInput!): User!
        validateToken(input: String!): TokenValid!
        addUser(input: AddUserInput!): User
        updateUserById(_id: ID!, changes: UpdateUserInput!): User
        deleteUserById(_id: ID!): User
    }
`;
