const { gql } = require("apollo-server");

const typeDefs = gql`

    type User{
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User]
    }

    type Query{
        users: [User!]!
        user(id: ID!): User! 
    }

    input AddUserInput{
        name: String!
        username: String!
        age: Int!
        nationality: Nationality = RUSSIA
    }

    input updateUsernameInput{
        id: ID!
        newUsername: String!
    }

    type Mutation{
        addUser(input: AddUserInput!): User
        updateUsername(input: updateUsernameInput!): User
        deleteUser(id: ID!): User
    }

    enum Nationality{
        CANADA
        USA
        FRANCE
        RUSSIA
        BRAZIL
        INDIA   
    }
`

module.exports = { typeDefs };