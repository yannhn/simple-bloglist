const Blog = ({ title, content }: { title: string; content: string }) => {
  return (
    <div className="flex-col m-4">
      <div className="card p-4 bg-base-100 shadow-xl">
        <h2 className="card-title mb-4">{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Blog;
