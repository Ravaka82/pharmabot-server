import {gql} from "apollo-server-express";

export default gql`
    type Search {
        _id: ID!
        user: User
        history: String
        searches: [SearchKeywordType]
        createdAt: Date
    }
    
    type SearchKeywordType {
        keyword: String
        at: String
    }
    type SearchCountType{
        _id: String
        count: String
    }
    type SearchOccurenceType{
        _id:String
        keyword: String
        count: String
        at: String
    }
    input SearchKeywordInput {
        keyword: String
        at: String
    }
  

    input AddSearchInput {
        user: ID!
        history: String!
        searches: [SearchKeywordInput]!
    }

    extend type Query {
        searches: [Search]
        countOccurence:[SearchCountType]
      
    }

    extend type Mutation {
        addSearch(input: AddSearchInput!): Search,
        addOccurenceByMonth(month: String!,nombre: String!):[SearchOccurenceType]
    }
`;
