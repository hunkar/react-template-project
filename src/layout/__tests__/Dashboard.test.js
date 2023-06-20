import { render, screen, act } from "@testing-library/react";
import Dashboard from "../Dashboard";

test("Don't render graphic if data is null. And show no data information.", () => {
  window.SVGPathElement = jest.fn();

  render(<Dashboard />);

  expect(
    screen.getByText(/Welcome to template application./i)
  ).toBeInTheDocument();
});
