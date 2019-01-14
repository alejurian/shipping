const {
  buildSchema,
} = require('graphql');

module.exports = buildSchema(`
type User {
  _id: ID!
  email: String!
  firstName: String!
  lastName: String!
  password: String
  type: String!
  createdAt: String!
  updatedAt: String!
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

type Client {
  _id: ID!
  email: String!
  firstName: String!
  lastName: String!
  password: String
  shipList: [Shipping!]!
  createdAt: String!
  updatedAt: String!
}

type Distributor {
  _id: ID!
  email: String!
  firstName: String!
  lastName: String!
  password: String
  shipList: [Shipping!]!
  createdAt: String!
  updatedAt: String!
}

type Shipping {
  _id: ID!
  name: String!
  price: Float!
  currency: String!
  weight: Float!
  chargeId: String!
  client: Client!
  distributor: Distributor!
  createdAt: String!
  updatedAt: String!
}

type Assignment {
  _id: ID!
  shipping: Shipping!
  distributor: Distributor!
  createdAt: String!
  updatedAt: String!
}

input UserInput {
  email: String!
  firstName: String!
  lastName: String!
  password: String!
  type: String!
}

input ClientInput {
  email: String!
  firstName: String!
  lastName: String!
  password: String!
}

input DistributorInput {
  email: String!
  firstName: String!
  lastName: String!
  password: String!
}

input ShippingInput {
  name: String!
  price: Float!
  currency: String!
  weight: Float!
  chargeId: String!
  client: String!
}

input AssignShippingInput {
  shipping: ID!
  distributor: ID!
}

type RootQuery {
  users: [User!]!
  clients: [Client!]!
  shippings: [Shipping!]!
  distributors: [Distributor!]!
  assignments: [Assignment!]!
  login(email: String!, password: String!): AuthData!
}

type RootMutation {
  createUser(userInput: UserInput): User
  createClient(clientInput: ClientInput): Client
  createShipping(shippingInput: ShippingInput): Shipping
  createDistributor(distributorInput: DistributorInput): Distributor
  assignShipping(assignShippingInput: AssignShippingInput): Assignment
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
