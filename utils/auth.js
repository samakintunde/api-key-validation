import { getClient } from "../services/client";

const apiKeyValidation = async (req, res, next) => {
  const apiKey = req.get("api_key");

  if (!apiKey) {
    return res.status(400).send({
      status: false,
      response: "Missing API Key"
    });
  }

  console.log("req", req);

  try {
    const client = await getClient(req.db, apiKey);
    console.log("client", client);

    if (client) {
      next();
    }
  } catch (error) {
    console.log("db", req.db);

    return res.status(400).send({
      status: false,
      response: "Invalid API Key"
    });
  }
};

export { apiKeyValidation };
