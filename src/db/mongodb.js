const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url =
  "mongodb+srv://Mikey:basketball@cluster0.7002c.mongodb.net/Ubiquity?retryWrites=true&w=majority";

const dbName = "TwitAPI";

const db = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxIdleTimeMS: 100,
  });
  const db = client.db(dbName).collection(dbName);

  process.on("exit", () => client.close());

  return db;
};

module.exports = db;