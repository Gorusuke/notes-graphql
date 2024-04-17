import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import { getAllNotes, getNoteById, getNotesByCategoryId, getNotesCount } from "./query/noteQuery.js";
import { noteDefinitions } from "./definitions/noteDefinitions.js";
import { addNote, deleteNotes, updateArchiveNote, updateNotes, updateNotesByCategoryId, updateUnarchiveNote } from "./mutations/noteMutation.js";
import { categoryDefinitions } from "./definitions/categoryDefinition.js";
import { getAllCategories } from "./query/categoryQuery.js";
import { addCategories, deleteCategories } from "./mutations/categoryMutation.js";
const typeDefs = `#graphql
  ${noteDefinitions}
  ${categoryDefinitions}
`;
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
};
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
});
console.log(`Server ready ats ${url}`);
