import { useState, useEffect } from "react";
import axios from "axios";
import "./ComicById.scss";

//Component displaying informations about a comic based on his ID

function ComicById({ comicId }) {
  //states for request to backend
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // request to backend for comics by character ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-i41r.onrender.com/comic/${comicId}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [comicId]);
  //Comics By Character Page:
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="comicsInFavoritePage">
      <img
        src={`${data.thumbnail.path}/landscape_xlarge.${data.thumbnail.extension}`}
        alt=""
      />
      <p className="pTitle">{data.title}</p>
      <p className="pDesc">{data.description}</p>
    </div>
  );
}

export default ComicById;
