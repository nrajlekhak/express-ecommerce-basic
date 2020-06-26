const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const uri =
  "mongodb+srv://niraj:VZ1uRVf4P3YsAdHQ@cluster0-lnfot.mongodb.net/shop?retryWrites=true&w=majority&authSource=admin";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(uri, { useUnifiedTopology: true })
    .then((client) => {
      _db = client.db();

      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found.";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
