// Importation des modules nécessaires
const express = require('express');
const app = express();

// Middleware pour analyser les corps des requêtes JSON
app.use(express.json());

// Routes , on définir ici toutes les routes de l'api 
app.get('/', (req, res) => {
    res.send('Bonjour, monde!');
});

app.get('/crash_test', (req, res) => {
    res.send('Crash test');
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur en écoute sur le port ${port}...`));