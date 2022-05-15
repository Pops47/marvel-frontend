import page404 from "../assets/images/marvel-404.jpg";
import "./PageNotFound.scss";

const PageNotFound = () => {
  return (
    <div className="notfound-container">
      <img src={page404} alt="" />
      <h3>404 Not Found</h3>
    </div>
  );
};

export default PageNotFound;
