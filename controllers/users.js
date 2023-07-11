const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  console.log("us:", users);
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    return response.status(400).json({
      error: `User validation failed: username: Path password is shorter than the minimum allowed length (3)`,
    });
  }

  if (!username || !name) {
    return response.status(400).json({ error: `no username or name` });
  }

  const findUser = await User.find({});

  let usedUserNames = [];
  for (let i = 0; i < findUser.length; i++) {
    usedUserNames.push(findUser[i].username);
  }

  const cleanUserUserName = usedUserNames.filter((item) => item !== undefined);

  if (cleanUserUserName.includes(username)) {
    return response.status(400).json({ error: `username must be unique` });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: username,
    name: name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);

  console.log("length:", findUser.length);
});

module.exports = usersRouter;
