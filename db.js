import { MongoClient } from "mongodb";
import assert from "assert";
import { DB_URL, DB_NAME } from "./env";

// Connect to the DB Server
MongoClient.connect(DB_URL, (err, client) => {
  assert.equal(null, err);
  console.log("Connection to DB was successful");

  const db = client.db(DB_NAME);

  client.close();
});
