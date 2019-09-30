import { Router } from "express";
import { createUser, getUser } from "../services/user";
import { createClient } from "../services/client";

const router = Router();

router.post("/hello", async (req, res) => {
  const { username } = req.body;

  const user = await createUser(req.db, username);

  console.log("userDetails", user);

  res.status(200).send({
    status: true,
    response: user
  });
});

router.post("/api_key", async (req, res, next) => {
  const { apiKey } = req.body;

  await createClient(req.db, apiKey);

  res.status(200).send({
    status: true,
    response: "API Key successfully added"
  });
});

router.get("/", async (req, res) => {
  const users = await getUser(req.db);

  res.status(200).send({
    status: true,
    response: users
  });
});

export default router;
