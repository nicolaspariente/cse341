const express = require("express");
const router = require("./router/router");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("./db/connection");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./router/router.js"));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
