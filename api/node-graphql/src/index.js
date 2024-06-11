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
const getExercises = require('./services/dataProvider.js');
const generateWeeklyPlan =require('./services/generateWeeklyPlan.js')

const app = express();

const httpPort = process.env.HTTP_PORT || 3000;
const httpsPort = process.env.HTTPS_PORT || 3001;

const sslServer = https.createServer({
    //key: fs.readFileSync('/certs/key.pem'), //container usage
    //cert: fs.readFileSync('/certs/cert.pem'),
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'), //local usage
}, app)

  

// Utilisez morgan pour enregistrer les requêtes
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
        res.send('Hello World');
    });
    app.get('/exercises', (req, res) => {
        getExercises({ type: 'stretching'})
          .then(data => res.json(data))
          .catch(err => res.status(500).json({ error: err.message }));
    });

    app.get('/weekPlan', async (req,res) =>{
        const userProvided2 = {
            daysOfTheWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            objectives: ['cardio', 'strength', 'stretching'],
            Infrastructure: ['Yes'],
            level: ['intermediate'],
            targetedMuscles: {
                upperBody: ['chest', 'abdominals', 'neck'],
                back: ['lats', 'traps', 'lower_back', 'middle_back'],
                arm: ['biceps', 'forearms', 'triceps']
            }
        };
        const userProvided = {
            daysOfTheWeek: ['Monday', 'Tuesday','Wednesday','Thursday'],
            objectives: ['cardio','stretching'],
            Infrastructure: ['Yes'],
            level: ['beginner'],
            targetedMuscles: {
                legs: ['abductors', 'adductors', 'quadriceps', 'calves', 'glutes', 'hamstrings'],
                upperBody: ['chest', 'abdominals', 'neck'],
                back: ['lats', 'traps', 'lower_back', 'middle_back'],
                arm: ['biceps', 'forearms', 'triceps']
            }
        };
        
        const plan = await generateWeeklyPlan(userProvided);
        res.json(plan);
        console.log(plan)
    })
})();


