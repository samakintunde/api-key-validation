import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

import user from "./routes/user";
import { DB_NAME, DB_URL } from "./env";

const PORT = process.env.PORT || 5000;

const app = express();

let mongoClient;

MongoClient.connect(DB_URL, { useNewUrlParser: true }, (err, client) => {
  mongoClient = client;

  if (err === null) {
    console.log("Connection to DB was successful");
  }
});

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Inject the db instance into the request object
app.use((req, res, next) => {
  req.db = mongoClient.db(DB_NAME);
  next();
});

// Routing Middlewares
app.use("/users", user);

app.listen(5000, () => {
  console.log(`App started from  http://localhost:${PORT}`);
});

process.on("exit", code => {
  console.log(`About to exit with code: ${code}`);
  mongoClient.close();
});

process.on("SIGINT", () => {
  console.log("Caught interrupt signal");
  process.exit();
});
