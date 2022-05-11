import axios from "axios";

function Characters() {
  const charactersTab = axios.get(
    "https://marvel-backend-by-pops.herokuapp.com/characters"
  );
  console.log(charactersTab);

  return (
    <div>
      <h1>Caracters</h1>
    </div>
  );
}

export default Characters;
