const express = require("express");
const router = require("./router/router");
const app = express();
const port = process.env.PORT || 3000;

app.use("/", require("./router/router.js"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
