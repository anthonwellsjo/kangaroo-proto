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
    allUsers: (parent = null, args: UserArgs, context: Context) => {
      return context.prisma.user.findMany({});
    },
  },
  Mutation: {
    signupUser: (parent = null, args: UserArgs, context: Context) => {
      return context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email
        }
      })
    }
  }
}

interface UserArgs {
  name: string,
  email: string
}


export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})