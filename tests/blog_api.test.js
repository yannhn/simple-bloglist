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
  console.log(response);
  for (const object of response.body) {
    console.log("ob:", object);
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
  console.log("blogsatEnd", blogsAtEnd);
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((n) => n.title);
  console.log(contents);

  expect(contents).toContain("newNoteTitle");
});
