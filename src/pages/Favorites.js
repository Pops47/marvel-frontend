import CharacterById from "../components/CharacterById";
import ComicById from "../components/ComicById";
import "./Favorites.scss";

function Favorites({
  favComics,
  handleFavComics,
  favCharacters,
  handleFavCharacters,
}) {
  return (
    <div className="both-columns">
      <div className="fav-char">
        <h1>Favorite characters :</h1>
        {favCharacters.map((item) => (
          <div key={item}>
            <CharacterById characterId={item} page={"favoritePage"} />
            <button
              className={favCharacters.includes(item) ? "fav-on" : "fav-off"}
              onClick={() => handleFavCharacters(item)}
            >
              {favCharacters.includes(item) ? "♥" : "+"}
            </button>
          </div>
        ))}
      </div>
      <div className="fav-comic">
        <h1>Favorite comics :</h1>
        {favComics.map((item) => (
          <div key={item}>
            <ComicById comicId={item} />
            <button
              className={favComics.includes(item) ? "fav-on" : "fav-off"}
              onClick={() => handleFavComics(item)}
            >
              {favComics.includes(item) ? "♥" : "+"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
