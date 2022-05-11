import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header>
      <img src="" alt="Logo Marvel" />
      <nav>
        <Link to="/characters">
          <button>Characters</button>
        </Link>
        <Link to="/comics">
          <button>Comics</button>
        </Link>
        <Link to="/favorites">
          <button>Favorites</button>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
