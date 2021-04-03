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
  getUser(id: Int): User
  allChildren: [Child!]!
  getChildrenFromUser(userUniqueInput: UserUniqueInput): [Child]
}
enum SortOrder {
  asc
  desc
}
type User {
  email: String!
  name: String!
  id: Int!
  children: Child
}
type Child {
  id: Int!
  name: String!
  birthDate: DateTime!
  parent: User!
}
input UserUniqueInput {
  email: String
  id: Int
}
scalar DateTime
`

const resolvers = {
  Query: {
    allUsers: (parent = null, args: FindUserArgs, context: Context) => {
      return context.prisma.user.findMany();
    },
    getUser: (parent = null, args: FindUserArgs, context: Context) => {
      return context.prisma.user.findFirst({
        where: { id: args.id }
      })
    },
    allChildren: (parent = null, args = null, context: Context) => {
      return context.prisma.child.findMany();
    }
  },
  Mutation: {
    signupUser: (parent = null, args: RegisterUserArgs, context: Context) => {
      return context.prisma.user.create({
        data: {
          name: args.name,
          email: args.email
        }
      })
    }
  }
}


interface FindUserArgs {
  id: number,
  email: string
}
interface RegisterUserArgs {
  name: string,
  email: string
}


export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})