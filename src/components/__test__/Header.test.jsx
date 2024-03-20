import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

//this below test is useless ngl
test("renders the navbar", () => {
  render(<Header />);
  const navigate = screen.getByTestId("navigation");
  expect(navigate).toBeInTheDocument();
});
