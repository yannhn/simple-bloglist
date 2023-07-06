const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const blogsRouter = require("../controllers/blogs");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("unique identifier property is named id", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  for (const object of response.body) {
    expect(object.id).toBeDefined();
  }
});

// Write a test that verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post. At the very least, verify that the total number of blogs in the system is increased by one. You can also verify that the content of the blog post is saved correctly to the database.

// Once the test is finished, refactor the operation to use async/await instead of promises.

test("successfull http post request", async () => {
  const newBlog = {
    title: "newNoteTitle",
    author: "newNoteAuthor",
    url: "newNoteUrl",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((n) => n.title);

  expect(contents).toContain("newNoteTitle");
});

test("check if likes is missing from request", async () => {
  const newBlog = {
    title: "testLike",
    author: "newNoteAuthor",
    url: "newNoteUrl",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const addedBlogs = blogsAtEnd.find((blog) => blog.title === "testLike");

  expect(addedBlogs.likes).toBe(0);
});

// Write tests related to creating new blogs via the /api/blogs endpoint, that verify that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.

// Make the required changes to the code so that it passes the test.

test("check if title or url properties are missing", async () => {
  const newBlog = {
    author: "newAuthor",
    likes: 10,
  };

  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.status).toBe(400);
});

test("Blog update successful ", async () => {
  const newBlog = {
    title: "Masterpiece",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  };

  await api.post("/api/blogs").send(newBlog).expect(201);

  const allBlogs = await helper.blogsInDb();
  const blogToUpdate = allBlogs.find((blog) => blog.title === newBlog.title);

  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const foundBlog = blogsAtEnd.find((blog) => blog.likes === 13);
  expect(foundBlog.likes).toBe(13);
});
