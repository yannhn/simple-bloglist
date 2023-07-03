import Header from "./components/Header/Header";
import Blog from "./components/Blog/Blog";
import AddBlog from "./components/AddBlog/AddBlog";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import "./App.css";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

interface Blog {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
}

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLikes, setNewLikes] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:3001/blogs";
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setBlogs(data);
    };
    fetchData();
  }, []);

  const addNewBlog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newBlog: Blog = {
      id: nanoid(),
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    };

    const postData = async () => {
      const url = "http://localhost:3001/blogs";
      const settings = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      };
      const res = await fetch(url, settings);
      const data = await res.json();
      setBlogs((prevBlog) => [...prevBlog, data]);
    };

    if (!newBlog.title && !newBlog.author && !newBlog.url && !newBlog.likes) {
      setErrorMessage("you did not input something");
    } else if (!newBlog.title) {
      setErrorMessage("title is missing");
    } else if (!newBlog.url) {
      setErrorMessage("content is missing");
    } else {
      postData();
      setErrorMessage("");
      setNewTitle("");
      setNewUrl("");
    }
  };

  const changeTitle = (event: React.FormEvent<HTMLFormElement>) => {
    setNewTitle(event.target.value);
  };

  const changeAuthor = (event: React.FormEvent<HTMLInputElement>) => {
    setNewAuthor(event.target.value);
  };

  const changeUrl = (event: React.FormEvent<HTMLInputElement>) => {
    setNewUrl(event.target.value);
  };

  const changeLikes = (event: React.FormEvent<HTMLInputElement>) => {
    setNewLikes(event.target.value);
  };

  return (
    <>
      <Header />
      <AddBlog
        addNewBlog={addNewBlog}
        changeTitle={changeTitle}
        changeAuthor={changeAuthor}
        changeUrl={changeUrl}
        changeLikes={changeLikes}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
        newLikes={newLikes}
      />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {blogs.map((blog) => (
        <Blog key={blog.id} title={blog.title} content={blog.url} />
      ))}
    </>
  );
}

export default App;
