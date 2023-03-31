import axios from "axios";
import { useState, useEffect } from "react";
import CreatePagination from "../components/CreatePagination";
import "./CharactersAndComics.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import notfound from "../assets/images/notfound.jpg";

// PAGE TO SEE ALL COMICS, WITH SEARCHBAR AND PAGINATION

function Comics({ favComics, handleFavComics }) {
  // states for requesting data to backend
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //states for searchbar
  const [comicsSearch, setComicsSearch] = useState("");
  //states for pagination
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 100;

  //Request for comics data (reload when searchbar or pagination change)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-i41r.onrender.com/comics?title=${comicsSearch}&skip=${skip}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [comicsSearch, skip]);
  // Comics page :
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="container">
      <h1>Comics</h1>
      <div className="top-container">
        <div className="searchbar">
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          <input
            type="searchbar"
            placeholder="Search for a comic"
            value={comicsSearch}
            onChange={(e) => {
              setComicsSearch(e.target.value); // get searchbar text
              setCurrentPage(1); // reset to page 1 at any change
              setSkip(0);
            }}
          />
        </div>
        <div className="pagination">
          <CreatePagination //pagination component
            count={data.count}
            itemPerPage={itemPerPage}
            setSkip={setSkip}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <p>
            Page: {currentPage} / {Math.ceil(data.count / itemPerPage)}
          </p>
        </div>
      </div>
      <p>{data.count} comics</p>
      <div className="bottom-container">
        {data.results.map((comic) => {
          //map on requested list of comics
          const { path, extension } = comic.thumbnail;
          const { title, description, _id } = comic;

          return (
            <div key={_id} className="element">
              <img
                src={
                  path ===
                  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
                    ? `${notfound}`
                    : `${path}/portrait_fantastic.${extension}`
                }
                alt=""
              />
              {/* button to put in favorite and remove */}
              <div className="nameAndFav">
                <p className="name">{title}</p>
                <button
                  className={favComics.includes(_id) ? "fav-on" : "fav-off"}
                  onClick={() => handleFavComics(_id)}
                >
                  {favComics.includes(_id) ? "♥" : "+"}
                </button>
              </div>
              <p className="description">
                {description
                  ? description
                  : "Sorry... We don't have description for this comic !"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comics;
