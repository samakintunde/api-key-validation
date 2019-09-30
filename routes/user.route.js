import { Router } from "express";
import { createUser, getUser } from "../services/user";

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

router.get("/", async (req, res) => {
  const users = await getUser(req.db);

  res.status(200).send({
    status: true,
    response: users
  });
});

export default router;
