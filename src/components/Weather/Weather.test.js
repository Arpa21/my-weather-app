import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Weather from "./Weather";

const setup = () => render(<Weather />);

afterEach(() => {
  cleanup();
});

test("renders the heading content", () => {
  setup();

  expect(screen.getByTestId("heading")).toHaveTextContent("Weather App");
});

test("It updates the input value", () => {
  setup();

  const inputField = screen.getByTestId("city-input");
  fireEvent.change(inputField, { target: { value: "Aus" } });

  expect(inputField.value).toBe("Aus");
});

test("should show error message when pressing enter with empty input field", () => {
  setup();

  const inputField = screen.getByTestId("city-input");
  fireEvent.keyPress(inputField, { key: "Enter", code: 13, charCode: 13 });
  const errorMsg = screen.getByTestId("error");

  expect(errorMsg).toHaveTextContent("Input cannot be empty");
});
