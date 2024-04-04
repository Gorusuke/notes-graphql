import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';


interface Note {
  id: number
  title: string
  description: string
  categoryId: string
}

interface Notes {
  notes?: Note[]
}

const getAllNotes = async () => {
  const getNotes = await fetch('http://localhost:4000/api/notes')
  const { notes }: Notes = await getNotes.json()
  return notes
}

const typeDefs = `#graphql
  type Note {
    id: Int
    title: String
    description: String
    categoryId: String
  }

  type Query {
    allNotes: [Note]
    allNotesCount: Int
    allNotes3: Int
  }
`

const resolvers = {
  Query: {
    allNotes: async () => await getAllNotes(),
    allNotesCount: async () => (await getAllNotes()).length,
    allNotes3: async () => 23,
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
});

console.log(`Server ready at ${url}`)