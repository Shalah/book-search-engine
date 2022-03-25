const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Book {
    authors: [String]
    description: String!
    bookId: ID!
    image: String
    link: String
    title: String!
  }

  type Auth {
    token: String
    user: User
  }

  input bookInput {
    authors: [String]
    description: String!
    bookId: ID!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login (email: String!, password: String!) : Auth
    addUser (username: String!, email: String!, password: String!): Auth
    saveBook (bookData: bookInput!) : User
    removeBook (bookId: ID!) : User
  }

`;

module.exports = typeDefs;
