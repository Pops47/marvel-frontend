import axios from "axios";
import { useState, useEffect } from "react";
import CreatePagination from "../components/CreatePagination";

function Comics() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [comicsSearch, setComicsSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 100;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-by-pops.herokuapp.com/comics?title=${comicsSearch}&skip=${skip}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [comicsSearch, skip]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container">
      <h1>Comics</h1>
      <input
        type="searchbar"
        value={comicsSearch}
        onChange={(e) => {
          setComicsSearch(e.target.value);
          setCurrentPage(1);
          setSkip(0);
        }}
      />
      <p>{data.count} comics</p>
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
      {data.results.map((comic) => {
        const { path, extension } = comic.thumbnail;
        const { title, description, _id } = comic;

        return (
          <div key={_id} className="comic">
            <img src={`${path}/portrait_medium.${extension}`} alt="" />
            <p>{title}</p>
            <p>{description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Comics;
