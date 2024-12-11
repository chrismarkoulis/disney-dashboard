import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "./store/features/charactersSlice";
import { CharacterTable, CharacterModal, PieChart } from "./components";
import "./styles/App.css";

function App() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);
  const status = useSelector((state) => state.characters.status);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const totalPages = useSelector((state) => state.characters.totalPages);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const initialPageSize = page === 1 ? 100 : rowsPerPage;
    if (!characters[page]) {
      dispatch(fetchCharacters({ page, pageSize: initialPageSize }));
    }
  }, [dispatch, page, rowsPerPage, characters]);

  const handleRowClick = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="app-container">
      <h1>Disney Dashboard</h1>
      <PieChart characters={Object.values(characters).flat()} />
      <CharacterTable
        characters={Object.values(characters).flat()}
        status={status}
        onRowClick={handleRowClick}
        setPage={setPage}
        page={page}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalPages={totalPages}
      />
      {selectedCharacter && (
        <CharacterModal character={selectedCharacter} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
