const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({});
  try {
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  if (!blog.likes) {
    blog.likes = 0;
  }

  if (!blog.title || !blog.url) {
    response.status(400).end();
  }

  try {
    const savedblog = await blog.save();
    response.status(201).json(savedblog);
  } catch (error) {
    next(error);
  }
  // blog.save().then((result) => {
  //   response.status(201).json(result);
  // });
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;

  try {
    await Blog.findByIdAndRemove(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  const newLikes = {
    likes: body.likes,
  };

  try {
    await Blog.findByIdAndUpdate(id, newLikes, { new: true });
    response.status(204).json({ message: "worked" }).end();
  } catch (error) {
    console.error("err:", error);
  }
});

module.exports = blogsRouter;
