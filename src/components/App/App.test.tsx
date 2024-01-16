import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./index";

test("renders learn react link", async () => {
  render(<App />);
  const board = await screen.findByLabelText("game board");
  expect(board).toBeInTheDocument();
});
