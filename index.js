var express = require('express');
var app = express();
const jwt = require('jsonwebtoken');
const fs = require('fs');



// Load private and public keys
const privateKey = fs.readFileSync('private-key.pem');
const publicKey = fs.readFileSync('public-key.pem');

const payload = {
  userId: 123,
  username: 'john.doe',
  roles: ['user', 'admin'],
};

// Sign the JWT with the private key
const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

console.log('Token:', token);

// app.get('/', function (req, res) {
// res.json({name: "Welocme to GeeksforGeeks!"});
// });

// app.listen(5000);