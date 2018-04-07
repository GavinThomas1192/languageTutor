const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

require("dotenv").load();

const cors = require("cors");
const express = require("express");
// const bodyParser = require("body-parser");
const OpenTok = require("opentok");
require("es6-promise").polyfill();
require("isomorphic-fetch");

const opentok = new OpenTok(
  functions.config().open_tok.api_key,
  functions.config().open_tok.api_secret
);

// const port = 3001;

// Configure app to use bodyParser to parse json data
const app = express();

app.use(cors({ origin: true, credentials: true }));

const api = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`; // prepend '/' to keep query params if any
  }
  return app(request, response);
});

// Test server is working (GET http://localhost:3001/api)
app.get("/api/", (req, res) => {
  res.json({ message: "Hi, welcome to the server api!" });
});

app.get("/api/getTokens", (req, res) => {
  let sessionId;
  let token;
  opentok.createSession({}, (error, session) => {
    if (error) {
      console.log("Error creating session:", error);
    } else {
      sessionId = session.sessionId;
      console.log(`Session ID: ${sessionId}`);
      //  Use the role value appropriate for the user:
      const tokenOptions = {};
      tokenOptions.role = "publisher";
      tokenOptions.data = "username=bob";

      // Generate a token.
      token = opentok.generateToken(sessionId, tokenOptions);
      console.log(token);
      res.status(200).send({ id: sessionId, token });
      console.log("HIT THE GET TOKEN ROUTE!!! SENDING...", sessionId, token);
    }
  });
});

module.exports = {
  api
};
