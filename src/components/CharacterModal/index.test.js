import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CharacterModal from "./index";

const mockCharacter = {
  _id: "1",
  name: "Mickey Mouse",
  tvShows: ["The Mickey Mouse Club"],
  videoGames: ["Kingdom Hearts"],
  imageUrl: "https://example.com/mickey.jpg",
};

test("renders modal with character details", () => {
  const handleClose = jest.fn();

  render(<CharacterModal character={mockCharacter} onClose={handleClose} />);
  const title = screen.getByRole("heading", { name: /Mickey Mouse/i });
  expect(title).toBeInTheDocument();

  const image = screen.getByAltText(/Mickey Mouse/i);
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src", mockCharacter.imageUrl);

  expect(screen.getByText(/Kingdom Hearts/i)).toBeInTheDocument();

  fireEvent.keyDown(document.body, { key: "Escape", code: "Escape" });
});
