const AddBlog = ({
  addNewBlog,
  changeTitle,
  changeAuthor,
  changeUrl,
  changeLikes,
  newTitle,
  newAuthor,
  newUrl,
  newLikes,
}: {
  addNewBlog: (event: any) => void;
  changeTitle: (event: any) => void;
  changeAuthor: (event: any) => void;
  changeUrl: (event: any) => void;
  changeLikes: (event: any) => void;
  newTitle: string;
  newAuthor: string;
  newUrl: string;
  newLikes: number;
}) => {
  return (
    <form className="flex flex-col items-center" onSubmit={addNewBlog}>
      <label htmlFor="input-text"></label>
      <input
        value={newTitle}
        id="input-text"
        type="text"
        className="input input-bordered w-full max-w-xs"
        onChange={changeTitle}
      />
      <label htmlFor="input-textarea"></label>
      <input
        value={newAuthor}
        id="input-author"
        type="text"
        className="input input-bordered w-full max-w-xs"
        onChange={changeAuthor}
      />
      <label htmlFor="input-url"></label>
      <input
        value={newUrl}
        name=""
        type="text"
        id="input-url"
        className="input input-bordered w-full max-w-xs"
        onChange={changeUrl}
      ></input>
      <label htmlFor="input-likes"></label>
      <input
        value={newLikes}
        name=""
        type="number"
        id="input-url"
        className="input input-bordered w-full max-w-xs"
        onChange={changeLikes}
      ></input>
      <button className="btn btn-primary btn-sm" type="submit">
        submit
      </button>
    </form>
  );
};

export default AddBlog;
