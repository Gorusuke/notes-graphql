export const categoryDefinitions = `
  type Category {
    id: Int
    name: String
  }

  type Query {
    getAllCategories: [Category]
  }

  type Mutation {
    addCategories(name: String!): Category 
    deleteCategories(id: String!): [Category]
  }
`