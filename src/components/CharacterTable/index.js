import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  TableSortLabel,
} from "@mui/material";
import "./styles.css";

function CharacterTable({
  characters,
  status,
  onRowClick,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  totalPages,
}) {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCharacters = filteredCharacters.sort((a, b) => {
    if (orderBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });

  const paginatedCharacters = filteredCharacters.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="character-table-container">
      <TextField
        label="Search Characters"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="character-search-bar"
      />

      {status === "loading" && <p>Loading...</p>}

      <Table className="character-table">
        <TableHead>
          <TableRow>
            <TableCell sortDirection={orderBy === "name" ? order : false}>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleRequestSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell>TV Shows</TableCell>
            <TableCell>Video Games</TableCell>
            <TableCell>Allies</TableCell>
            <TableCell>Enemies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedCharacters.map((character) => (
            <TableRow key={character._id} onClick={() => onRowClick(character)}>
              <TableCell>{character.name}</TableCell>
              <TableCell>{character.tvShows.length}</TableCell>
              <TableCell>{character.videoGames.length}</TableCell>
              <TableCell>{character.allies.join(", ")}</TableCell>
              <TableCell>{character.enemies.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filteredCharacters.length}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 20, 50, 100, 200, 500]}
        className={`character-table-pagination ${
          page >= totalPages ? "disabled" : ""
        }`}
      />
    </div>
  );
}

export default CharacterTable;
