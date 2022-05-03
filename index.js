const express = require("express");
const router = require("./router/router");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("./db/connection");
const port = process.env.PORT || 3000;

app.use("/", require("./router/router.js"));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
