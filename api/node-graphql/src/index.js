// node-graphql/src/index.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const morgan = require('morgan');
const cors = require('cors');
const env= require('dotenv').config({ path: '../.env' });
const { PrismaClient } = require('@prisma/client')
const  typeDefs  = require('./schema.js')
const  resolvers  = require('./resolver.js')
const fs = require('fs');
const https = require('https');

const app = express();

const sslServer = https.createServer({
    key: fs.readFileSync('/certs/key.pem'),
    cert: fs.readFileSync('/certs/cert.pem'),
}, app)

  

// Utilisez morgan pour enregistrer les requêtes
app.use(cors());

app.use(morgan(function (tokens, req, res) {
  if (req.method !== 'OPTIONS') {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }
}));


const port = process.env.PORT || 3000;
const prisma = require('./prismaClient.js');

(async () => {
    const server = new ApolloServer({ 
        typeDefs,
        resolvers,
        context: {
            prisma,
        }
    });

    await server.start();
    server.applyMiddleware({ app });

    sslServer.listen(port, () => {
        console.log(`Server runs at: https://localhost:${port}`);
        //console.log('typeDefs:', typeDefs);
        if(typeDefs!= undefined){
            console.log('import schéma ok')
        }
        if(resolvers!= undefined){
            console.log('import resolver ok')
        }
        else{
            console.log('import schéma et resolver nok')
        }
    });
})();


