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

//importing diffenrent services


const {adjustExerciseLoad} = require('./services/updateWeekplan.js')



const app = express();

const httpPort = process.env.HTTP_PORT || 3000;
const httpsPort = process.env.HTTPS_PORT || 3001;

const sslServer = https.createServer({
    //key: fs.readFileSync('/certs/key.pem'), //container usage
    //cert: fs.readFileSync('/certs/cert.pem'),
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'), //local usage
}, app)

  

app.use(cors());



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

    app.listen(httpPort, () => {
        console.log(`Server runs at: http://localhost:${httpPort}`);
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
    sslServer.listen(httpsPort, () => {
        console.log(`Server runs at: https://localhost:${httpsPort}`);
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
    

    app.get('/', (req, res) => {
        res.send('Hello World \n Welcome on Jim API');
    });

    
    

    

    
})();


