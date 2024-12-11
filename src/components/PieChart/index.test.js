import React from "react";
import { render, screen } from "@testing-library/react";
import PieChart from "./index";

const mockCharacters = [
  { name: "Mickey Mouse", films: ["Fantasia", "Steamboat Willie"] },
  { name: "Donald Duck", films: ["The Wise Little Hen"] },
];

test("renders pie chart with character data", () => {
  render(<PieChart characters={mockCharacters} />);

  expect(screen.getByText(/Character Film Participation/i)).toBeInTheDocument();

  expect(screen.getByText(/Mickey Mouse/i)).toBeInTheDocument();
  expect(screen.getByText(/Donald Duck/i)).toBeInTheDocument();
});
