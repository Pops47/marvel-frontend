import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CharacterById from "../components/CharacterById";
import "./ComicsByCharacter.scss";

//Page giving all comics related to a character:
function ComicsByCharacter({ favComics, handleFavComics }) {
  //states for requesting data
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //get ID param
  const { characterId } = useParams();
  //requesting backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-by-pops.herokuapp.com/comics/${characterId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [characterId]);
  // Page Comics By characterID
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container">
      {/* character's info component */}
      <CharacterById characterId={characterId} page={"comicsPage"} />
      <h2>Related comics : </h2>
      <div className="listOfComics">
        {data.comics.map((comic) => {
          //  map on request's result
          const { path, extension } = comic.thumbnail;
          const { _id } = comic;
          return (
            <div className="element" key={_id}>
              <img src={`${path}/portrait_medium.${extension}`} alt="" />
              <div className="titleAndFav">
                <p className="pTitle">{comic.title}</p>
                <button
                  className={favComics.includes(_id) ? "fav-on" : "fav-off"}
                  onClick={() => handleFavComics(_id)}
                >
                  {favComics.includes(_id) ? "♥" : "+"}
                </button>
              </div>
              <p className="pDesc">
                {comic.description
                  ? comic.description
                  : "Sorry... We don't have description for this comic !"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ComicsByCharacter;
