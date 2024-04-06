import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { db } from "./db.ts";
import { notes } from "./drizzle/notesSchema.ts";

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
  }
`

const resolvers = {
  Query: {
    allNotes: async () => {
      const allNotes = await db.select().from(notes).all()
      return allNotes
    },
    allNotesCount: async () => {
      const allNotes = await db.select().from(notes).all()
      return allNotes.length
    }
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