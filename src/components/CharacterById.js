import { useState, useEffect } from "react";
import axios from "axios";
import "./CharacterById.scss";

//Component displaying informations about a character based on his ID

function CharacterById({ characterId, page }) {
  //states for request to backend
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // request to backend for comics by character ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-i41r.onrender.com/character/${characterId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <div>
      <p>Loading...</p>
      <img
        src="https://assets9.lottiefiles.com/private_files/lf30_C61K8f.json"
        alt=""
      />
    </div>
  ) : (
    <div
      className={
        page === "comicsPage"
          ? "characterInComicspage"
          : page === "favoritePage" && "characterInFavoritePage"
      }
    >
      <img
        src={`${data.thumbnail.path}/detail.${data.thumbnail.extension}`}
        alt=""
      />
      <p className="pName">{data.name}</p>
      <p className="pDesc">{data.description}</p>
    </div>
  );
}

export default CharacterById;
