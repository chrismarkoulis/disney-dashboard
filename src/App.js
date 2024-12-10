import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "./store/features/charactersSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.characters);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCharacters(page));
  }, [dispatch, page]);

  console.log(characters);


  return <div className="App"></div>;
}

export default App;
