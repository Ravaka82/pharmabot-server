import {gql} from "apollo-server-express";

export default gql`

  type Role {
    _id: ID!
    name: String
    pages: [String]
    createdAt: Date
    updatedAt: Date
  }

  input UpdateRoleInput {
    name: String
    pages: [String]
  }

  input AddRoleInput {
    name: String!
  }

  extend type Query {
    roles: [Role]!
  }

  extend type Mutation  {
    addRole(input: AddRoleInput!): Role
    updateRoleById(_id: ID!, changes: UpdateRoleInput!): Role
    deleteRoleById(_id: ID!): Role
  }
`;
