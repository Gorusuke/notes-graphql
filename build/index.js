import cors from 'cors';
import http from 'http';
import express from 'express';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
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
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
await server.start();
app.use('/graphql', cors(), express.json(), expressMiddleware(server));
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`Server ready at http://localhost:4000/graphql`);
