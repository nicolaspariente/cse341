const express = require("express");
const router = express.Router();
const dbinfo = require("../controllers/dbinfo");

router.get("/", (req, res) => {
  res.send("Hi Alejandra Fros");
});

router.get("/other", (req, res) => {
  res.send("Hi Walter Pariente");
});
router.get("/dbinfo", dbinfo.getData);

router.get("/dbinfo/:id", dbinfo.getById);

module.exports = router;
