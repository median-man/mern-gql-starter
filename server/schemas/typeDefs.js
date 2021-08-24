const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    temp: String
  }

  type Mutation {
    temp: String
  }
`;

module.exports = typeDefs;
