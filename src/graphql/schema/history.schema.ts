import {gql} from "apollo-server-express";

export default gql`
    type History {
        _id: ID!
        user: User
        description: String
        metadata: Any
        action: String!
        createdAt: Date
    }

    input AddHistoryInput {
        action: String!
        user: ID
        description: String
        metadata: Any
    }
    
    type deleteHistory {
        ok: Int
        deletedCount: Int
    }

    extend type Query {
        histories: [History]
    }

    extend type Mutation {
        addHistory(input: [AddHistoryInput]!): [History]
        deleteHistories(input: [ID]!): deleteHistory
    }
`;
