import { useNavigate } from "react-router-dom";
import "./Header.scss";
import logoMarvel from "../assets/images/logo-marvel.png";

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div>
        <img
          className="logo-marvel"
          style={{ height: 40 }}
          src={logoMarvel}
          alt="Logo Marvel"
          onClick={() => navigate("/")}
        />
      </div>

      <nav>
        <button onClick={() => navigate("/characters")}>Characters</button>
        <button onClick={() => navigate("/comics")}>Comics</button>
        <button onClick={() => navigate("/favorites")}>Favorites</button>
      </nav>
    </header>
  );
}

export default Header;
