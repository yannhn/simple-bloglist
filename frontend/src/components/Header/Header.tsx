const Header = () => {
  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <h1 className="normal-case text-xl text-accent">Simple bloglist</h1>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>Home</li>
          <li>Privacy</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
