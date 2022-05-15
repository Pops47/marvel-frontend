import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Welcome from "./pages/Welcome";
import Characters from "./pages/Characters";
import CharacterById from "./components/CharacterById";
import Comics from "./pages/Comics";
import ComicsByCharacter from "./pages/ComicsByCharacter";
import Favorites from "./pages/Favorites";
import PageNotFound from "./pages/PageNotFound";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  //States to record favorites
  const [favCharacters, setFavCharacters] = useState([]);
  const [favComics, setFavComics] = useState([]);

  //Get cookies informations when refresh
  useEffect(() => {
    if (Cookies.get("favCharacters") !== undefined) {
      setFavCharacters(JSON.parse(Cookies.get("favCharacters")));
    }
    if (Cookies.get("favComics") !== undefined) {
      setFavComics(JSON.parse(Cookies.get("favComics")));
    }
  }, []);

  // Function to add or remove element in favorite states
  const handleFavCharacters = (id) => {
    if (favCharacters === [] || favCharacters.includes(id) === false) {
      const newTab = [...favCharacters];
      newTab.push(id);
      setFavCharacters(newTab);
      Cookies.set("favCharacters", JSON.stringify(newTab));
    } else {
      const newTab = [...favCharacters];
      const result = newTab.filter((e) => e !== id);
      setFavCharacters(result);
      if ((newTab.length = 0)) {
        Cookies.remove("favCharacters");
      } else {
        Cookies.set("favCharacters", JSON.stringify(newTab));
      }
    }
  };
  const handleFavComics = (id) => {
    if (favComics === [] || favComics.includes(id) === false) {
      const newTab = [...favComics];
      newTab.push(id);
      setFavComics(newTab);
      Cookies.set("favComics", JSON.stringify(newTab));
    } else {
      const newTab = [...favComics];
      const result = newTab.filter((e) => e !== id);
      setFavComics(result);
      if ((newTab.length = 0)) {
        Cookies.remove("favComics");
      } else {
        Cookies.set("favComics", JSON.stringify(newTab));
      }
    }
  };

  //Routes
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="" element={<Welcome />} />
        <Route
          path="/characters"
          element={
            <Characters
              favCharacters={favCharacters}
              handleFavCharacters={handleFavCharacters}
            />
          }
        />
        <Route
          path="/character/:characterId"
          element={
            <CharacterById
              favCharacters={favCharacters}
              handleFavCharacters={handleFavCharacters}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics favComics={favComics} handleFavComics={handleFavComics} />
          }
        />
        <Route
          path="/comics/:characterId"
          element={
            <ComicsByCharacter
              favComics={favComics}
              handleFavComics={handleFavComics}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favComics={favComics}
              handleFavComics={handleFavComics}
              favCharacters={favCharacters}
              handleFavCharacters={handleFavCharacters}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
