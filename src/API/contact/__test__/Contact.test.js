import React from "react";
import Contact from "../Contact.js";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("Contact component testing, the component existance", () => {
  // render the componenet
  render(<Contact />);
  // obtain the headerElement
  const element = screen.getByTestId("contact");

  expect(element.textContent).toBe("Contact Page");
});
