import hero from "../assets/images/hero.jpg";
import "./Welcome.scss";

function Welcome() {
  return (
    <div className="welcome">
      <img src={hero} alt="" />
    </div>
  );
}

export default Welcome;
