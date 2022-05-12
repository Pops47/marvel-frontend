import { useState, useEffect } from "react";
import axios from "axios";

function CharacterById({ characterId }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-by-pops.herokuapp.com/character/${characterId}`
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
    <div>
      <img
        src={`${data.thumbnail.path}/landscape_xlarge.${data.thumbnail.extension}`}
        alt=""
      />
      <p>{data.name}</p>
      <p>{data.description}</p>
    </div>
  );
}

export default CharacterById;
