import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CharacterTable from "./index";

const mockCharacters = [
  {
    _id: "1",
    name: "Mickey Mouse",
    tvShows: [],
    videoGames: [],
    allies: [],
    enemies: [],
  },
  {
    _id: "2",
    name: "Donald Duck",
    tvShows: [],
    videoGames: [],
    allies: [],
    enemies: [],
  },
];

test("renders table headers", () => {
  render(
    <CharacterTable
      characters={mockCharacters}
      status="succeeded"
      onRowClick={jest.fn()}
      page={1}
      setPage={jest.fn()}
      rowsPerPage={10}
      setRowsPerPage={jest.fn()}
      totalPages={1}
    />
  );

  expect(screen.getByText(/Name/i)).toBeInTheDocument();
  expect(screen.getByText(/TV Shows/i)).toBeInTheDocument();
});

test("renders character names in the table", () => {
  render(
    <CharacterTable
      characters={mockCharacters}
      status="succeeded"
      onRowClick={jest.fn()}
      page={1}
      setPage={jest.fn()}
      rowsPerPage={10}
      setRowsPerPage={jest.fn()}
      totalPages={1}
    />
  );

  expect(screen.getByText(/Mickey Mouse/i)).toBeInTheDocument();
  expect(screen.getByText(/Donald Duck/i)).toBeInTheDocument();
});

test("filters characters by search input", () => {
    const { getByLabelText  } = render(
      <CharacterTable
        characters={mockCharacters}
        status="succeeded"
        onRowClick={jest.fn()}
        page={1}
        setPage={jest.fn()}
        rowsPerPage={10}
        setRowsPerPage={jest.fn()}
        totalPages={1}
      />
    );
  
    const searchInput = getByLabelText (/Search Characters/i);
  
    fireEvent.change(searchInput, { target: { value: "Mickey" } });
  
    expect(screen.queryByText(/Mickey Mouse/i)).toBeInTheDocument();
    expect(screen.queryByText(/Donald Duck/i)).not.toBeInTheDocument();
  });
