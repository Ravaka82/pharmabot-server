import {gql} from "apollo-server-express";

export default gql`
  type RefsMap {
    _id: ID!
    name: String
  }

  input UpdateRefsMapInput {
    name: String!
  }

  input AddRefsMapInput {
    name: String
  }

  extend type Query {
    refsMap: [RefsMap]
    findLastRefsMap: [RefsMap]
  }
  extend type Mutation {
    addRefsMap(input: AddRefsMapInput!): RefsMap
    updateRefsMapById(_id: ID!, changes: UpdateRefsMapInput!): [RefsMap]
    deleteRefsMapById(_id: ID!): [RefsMap]
  }
`;