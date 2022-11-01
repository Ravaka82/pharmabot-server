import {gql} from "apollo-server-express";

export default gql`
    type ProductRefs {
        _id: ID!
        nameProduct: String
        refsMap: RefsMap
    } 
    input AddProductRefsInput {
        nameProduct: String
        refsMap: String
    }
    extend type Query {
        productRefs: [ProductRefs]
    }
    extend type Mutation {
        addProductRefs(input: [AddProductRefsInput]!): [ProductRefs]
        deleteProduct(_id: ID!): ProductRefs
    }
`;
