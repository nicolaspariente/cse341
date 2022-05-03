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

const create = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .db("nicolasproject")
    .collection("contacts")
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the contact."
      );
  }
};

const update = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDb()
    .db("nicolasproject")
    .collection("contacts")
    .replaceOne({ _id: userId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the contact."
      );
  }
};

const deleteOne = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("nicolasproject")
    .collection("contacts")
    .remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the contact."
      );
  }
};

module.exports = { getData, getById, create, update, deleteOne };
