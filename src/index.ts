import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { getAllNotes, getNoteById, getNotesByCategoryId, getNotesCount } from "./query/noteQuery.ts";
import { noteDefinitions } from "./definitions/noteDefinitions.ts";
import { addNote, deleteNotes, updateArchiveNote, updateNotes, updateNotesByCategoryId, updateUnarchiveNote } from "./mutations/noteMutation.ts";
import { categoryDefinitions } from "./definitions/categoryDefinition.ts";
import { getAllCategories } from "./query/categoryQuery.ts";
import { addCategories, deleteCategories } from "./mutations/categoryMutation.ts";

const typeDefs = `#graphql
  ${noteDefinitions}
  ${categoryDefinitions}
`

const resolvers = {
  Query: {
    getAllNotes,
    getNotesCount,
    getNoteById,
    getNotesByCategoryId,
    getAllCategories
  },
  Mutation: {
    addNote,
    updateNotes,
    updateNotesByCategoryId,
    updateArchiveNote,
    updateUnarchiveNote,
    deleteNotes,
    addCategories,
    deleteCategories
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