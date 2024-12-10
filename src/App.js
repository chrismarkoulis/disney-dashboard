import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "./store/features/charactersSlice";
import { CharacterTable } from "./components";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  const status = useSelector((state) => state.characters.status);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCharacters(page));
  }, [dispatch, page]);

  const handleRowClick = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="App">
      <h1>Disney Dashboard</h1>
      <CharacterTable
        characters={characters}
        status={status}
        onRowClick={handleRowClick}
        setPage={setPage}
        page={page}
      />
    </div>
  );
}

export default App;
