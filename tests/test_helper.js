const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "test1title",
    author: "test1author",
    url: "test1url",
    likes: 10,
  },
  {
    title: "test2title",
    author: "test2author",
    url: "test2url",
    likes: 20,
  },
  { title: "test3title", author: "test3author", url: "test3url", likes: 30 },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((note) => note.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
