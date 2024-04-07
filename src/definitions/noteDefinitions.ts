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

  type Mutation {
    addNote(title: String!, description: String!): Note
    updateNotes(title: String!, description: String!, id: String!): Note
    updateNotesByCategoryId(id: String, categoryId: String!): Note 
    deleteNotes(id: String!): [Note]
    updateArchiveNote(id: String!): Note
    updateUnarchiveNote(id: String!): Note
  }
`