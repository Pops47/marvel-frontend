import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ComicsByCharacter() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { characterId } = useParams();

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

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container">
      {data.comics.map((comic) => {
        const { path, extension } = comic.thumbnail;
        return (
          <div key={comic._id}>
            <img src={`${path}/portrait_medium.${extension}`} alt="" />
            <p>{comic.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ComicsByCharacter;
