const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes
const routes = require('./routes');
app.use('/api', routes);

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
