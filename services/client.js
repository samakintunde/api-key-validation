const getClient = (db, apiKey) => {
  return new Promise((resolve, reject) => {
    db.collection("clients")
      .find({ apiKey: apiKey })
      .toArray((err, docs) => {
        if (docs && docs.length > 0) {
          console.log(docs);
          resolve(docs[0]);
        } else {
          reject();
        }
      });
  });
};

const createClient = (db, apiKey) => {
  db.collection("clients").insertOne({
    apiKey: apiKey
  });
};

export { createClient, getClient };
