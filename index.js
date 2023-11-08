var express = require('express');
var app = express();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const crypto = require("crypto");

// Load private and public keys
const privateKey = fs.readFileSync('private-key.pem');
const publicKey = fs.readFileSync('public-key.pem');

const payload = {
  userId: 123,
  username: 'john.doe',
  roles: ['user', 'admin'],
};

const encryptedData = crypto.publicEncrypt(
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  // We convert the data string to a buffer using `Buffer.from`
  Buffer.from(JSON.stringify(payload))
);

// console.log('checker ', encryptedData);
console.log('checker ', encryptedData.toString("base64"));

// Sign the JWT with the private key
// const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
const token = jwt.sign({payload: encryptedData.toString("base64")}, privateKey, { algorithm: 'RS256' });
console.log('\n\n')
console.log('Token: ', token);

const jwtDecode = jwt.decode(token, true);
console.log('\n\n')
console.log('decode from jwt payload', jwtDecode);
console.log('decode ', jwtDecode.payload);
console.log('\n\n')

const decryptedData = crypto.privateDecrypt(
  {
    key: privateKey,
    // In order to decrypt the data, we need to specify the
    // same hashing function and padding scheme that we used to
    // encrypt the data in the previous step
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  Buffer.from(jwtDecode.payload, "base64")
);

console.log('decoded payload 1', decryptedData.toString());

// app.get('/', function (req, res) {
// res.json({name: "Welocme to GeeksforGeeks!"});
// });

// app.listen(5000);