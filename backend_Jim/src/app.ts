
const express = require('express');
const session = require('express-session');


import { Request, Response } from 'express';


const app = express();
const memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));




app.get('/protected', function(req: Request, res: Response){
  res.send('This is a protected route');
});

app.listen(33264, function () {
  console.log('Listening on port 33264');
});