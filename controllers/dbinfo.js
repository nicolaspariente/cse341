const mongodb = require("../db/connection");
const ObjectId = require("mongodb").ObjectId;

const getData = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("nicolasproject")
    .collection("contacts")
    .find();
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};
const getById = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("nicolasproject")
    .collection("contacts")
    .find({ _id: userId });
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]); // we just need the first one (the only one)
  });
};

module.exports = { getData, getById };
