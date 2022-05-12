import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatePagination from "../components/CreatePagination";

function Characters() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [charactersSearch, setCharactersSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 100;

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

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container">
      <h1>Caracters</h1>
      <input
        type="searchbar"
        value={charactersSearch}
        onChange={(e) => {
          setCharactersSearch(e.target.value);
          setCurrentPage(1);
          setSkip(0);
        }}
      />
      <p>{data.count} personnages</p>

      <p>
        Page: {currentPage} / {Math.ceil(data.count / itemPerPage)}
      </p>
      <CreatePagination
        count={data.count}
        itemPerPage={itemPerPage}
        setSkip={setSkip}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {data.results.map((character) => {
        const { path, extension } = character.thumbnail;
        const { name, description, _id } = character;
        return (
          <div
            key={_id}
            className="character"
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
