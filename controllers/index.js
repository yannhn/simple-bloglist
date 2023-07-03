const indexRouter = require("express").Router();

indexRouter.use("/", (req, res) => {
  res.send(`<h1>This is a basic test</h1>`);
});

module.exports = indexRouter;
