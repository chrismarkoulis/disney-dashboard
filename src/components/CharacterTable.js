import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
} from "@mui/material";

function CharacterTable({ characters, status, onRowClick, setPage, page }) {
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [search, setSearch] = useState("");

  const handleChangePage = (_, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search Characters"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {status === "loading" && <p>Loading...</p>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>TV Shows</TableCell>
            <TableCell>Video Games</TableCell>
            <TableCell>Allies</TableCell>
            <TableCell>Enemies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCharacters.slice(0, rowsPerPage).map((character) => (
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
      />
    </div>
  );
}

export default CharacterTable;
