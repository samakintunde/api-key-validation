const getUser = db => {
  return new Promise((resolve, reject) =>
    db
      .collection("users")
      .find()
      .toArray((err, docs) => {
        if (docs && docs.length > 0) {
          resolve(docs[0]);
        } else {
          reject();
        }
      })
  );
};

const createUser = (db, name) => {
  return new Promise((resolve, reject) => {
    db.collection("users").insertOne({
      username: name
    });
  });
};

export { createUser, getUser };
