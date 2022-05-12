import axios from "axios";
import { useState, useEffect } from "react";

function Comics() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://marvel-backend-by-pops.herokuapp.com/comics"
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
      <h1>Comics</h1>
      <p>{data.count} comics</p>
      {data.results.map((comic) => {
        const { path, extension } = comic.thumbnail;
        const { title, description, _id } = comic;

        return (
          <div key={_id}>
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
