import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Characters() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://marvel-backend-by-pops.herokuapp.com/characters"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container">
      <h1>Caracters</h1>
      <p>{data.count} personnages</p>
      {data.results.map((character) => {
        const { path, extension } = character.thumbnail;
        const { name, description, _id } = character;

        return (
          <div
            key={_id}
            onClick={() => {
              navigate(`/comics/${_id}`);
            }}
          >
            <img src={`${path}/portrait_medium.${extension}`} alt="" />
            <p>{name}</p>
            <p>{description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Characters;
