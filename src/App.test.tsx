import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the title", () => {
  render(<App />);
  const title = screen.getByText(/weekend bulletin/i);
  expect(title).toBeInTheDocument();
});
