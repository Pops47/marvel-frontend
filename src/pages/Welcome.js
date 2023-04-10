import hero from "../assets/images/hero.jpg";
import "./Welcome.scss";

function Welcome() {
  return (
    <div className="welcome">
      <img src={hero} alt="drawing with about twenty Marvel heroes standing in front of us" />
    </div>
  );
}

export default Welcome;
