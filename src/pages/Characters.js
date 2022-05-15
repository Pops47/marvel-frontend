import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatePagination from "../components/CreatePagination";
import "./CharactersAndComics.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import notfound from "../assets/images/notfound.jpg";

//PAGE TO SEE ALL CHARACTERS, WITH SEARCHBAR AND PAGINATION

function Characters({ favCharacters, handleFavCharacters }) {
  // for navigation to comicsByCharacters
  const navigate = useNavigate();
  // states for requesting data to backend
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //state for searchbar
  const [charactersSearch, setCharactersSearch] = useState("");
  //states for pagination
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 100;
  //Request for characters data (reload when searchbar or pagination change)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-by-pops.herokuapp.com/characters?name=${charactersSearch}&skip=${skip}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [charactersSearch, skip]);
  //Characters page :
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container">
      <h1>Characters</h1>
      <div className="top-container">
        <div className="searchbar">
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          <input
            type="searchbar"
            placeholder="Search for a character"
            value={charactersSearch}
            onChange={(e) => {
              // get searchbar text and reset pagination at every change
              setCharactersSearch(e.target.value);
              setCurrentPage(1);
              setSkip(0);
            }}
          />
        </div>
        <div className="pagination">
          {/* pagination component */}
          <CreatePagination
            count={data.count}
            itemPerPage={itemPerPage}
            setSkip={setSkip}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {/* what is current page? */}
          <p>
            Page: {currentPage} / {Math.ceil(data.count / itemPerPage)}
          </p>
        </div>
      </div>
      {/* how many characters do we have? */}
      <p>{data.count} characters</p>
      <div className="bottom-container">
        {data.results.map((character) => {
          // map on requested list of characters
          const { path, extension } = character.thumbnail;
          const { name, description, _id } = character;

          return (
            <div key={_id} className="element">
              <img
                onClick={() => {
                  // navigation to each character's page with all related comics
                  navigate(`/comics/${_id}`);
                }}
                src={
                  path ===
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                    ? `${notfound}`
                    : `${path}/portrait_fantastic.${extension}`
                }
                alt=""
              />

              <div className="nameAndFav">
                <p className="name">{name}</p>
                <button
                  className={favCharacters.includes(_id) ? "fav-on" : "fav-off"}
                  onClick={() => handleFavCharacters(_id)}
                >
                  {favCharacters.includes(_id) ? "♥" : "+"}
                </button>
              </div>
              <p
                className="description"
                onClick={() => {
                  // navigation to each character's page with all related comics
                  navigate(`/comics/${_id}`);
                }}
              >
                {" "}
                {description
                  ? description
                  : "Sorry... We don't have description for this character !"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Characters;
