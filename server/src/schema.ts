import { makeExecutableSchema } from '@graphql-tools/schema'
import { Context } from './context'

enum SortOrder {
  asc = "asc",
  desc = "desc"
}


const typeDefs = `
type Mutation {
  signupUser(email: String!, name: String!): User!
}
type Query {
  allUsers: [User!]!
}
enum SortOrder {
  asc
  desc
}
type User {
  email: String!
  id: Int!
  name: String
}
scalar DateTime
`

const resolvers = {
  Query: {
    allUsers: (context: Context) => {
      console.log("find all users");
    },
  },
  Mutation: {
    signupUser: (context: Context) => {
      console.log("Create user");
      }
    }
  }




export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})