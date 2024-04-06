export const noteDefinitions = `
  type Note {
    id: Int
    title: String
    description: String
    categoryId: String
  }

  type Query {
    getAllNotes: [Note]
    getNotesCount: Int
    getNoteById(id: String!): Note
    getNotesByCategoryId(categoryId: String!): [Note]
  }
`