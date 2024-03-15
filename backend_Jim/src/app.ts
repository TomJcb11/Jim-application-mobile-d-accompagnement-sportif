const Keycloak = require('keycloak-connect');
const express = require('express');
const session = require('express-session');

const app = express();
const memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

const keycloak = new Keycloak({ store: memoryStore });

app.use(keycloak.middleware());

app.get('/protected', keycloak.protect(), function(req, res){
  res.send('This is a protected route');
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});