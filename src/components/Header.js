import { Link } from "react-router-dom";
import "./Header.scss";
import logoMarvel from "../assets/images/logo-marvel.png";

function Header() {
  return (
    <header>
      <Link to="/">
        <img style={{ height: 40 }} src={logoMarvel} alt="Logo Marvel" />
      </Link>
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
