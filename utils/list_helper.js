const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, blog) => a + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return sortedBlogs[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
