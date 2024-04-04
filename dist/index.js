import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
const getAllNotes = async () => {
    const getNotes = await fetch('http://localhost:4000/api/notes');
    const { notes } = await getNotes.json();
    return notes;
};
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
`;
const resolvers = {
    Query: {
        allNotes: async () => await getAllNotes(),
        allNotesCount: async () => (await getAllNotes()).length,
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
});
console.log(`Server ready at ${url}`);
