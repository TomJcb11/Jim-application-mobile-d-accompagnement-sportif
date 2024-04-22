import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { PrismaClient } from '@prisma/client';
import resolver from './middleware/resolver';
import schema from './middleware/schema';

// Création du client Prisma
const prisma = new PrismaClient();

// Création du serveur Apollo
const server = new ApolloServer({ 
    typeDefs: schema, 
    resolvers: resolver, 
    context: {
        prisma,
    },
});
// Création de l'application Express
const app  = express();

// Démarrage du serveur Apollo
server.start().then(() => {
    // @ts-ignore
    server.applyMiddleware({ app });
  
    // Démarrage du serveur
    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  });