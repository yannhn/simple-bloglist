const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const indexRouter = require("./controllers/index");
const connectDB = require("./utils/connectDB");

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/", indexRouter);

module.exports = app;
