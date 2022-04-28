import { render, screen, act } from "@testing-library/react";
import Dashboard from "../layout/Dashboard";

test("Don't render graphic if data is null. And show no data information.", async () => {
  await act(async () => render(<Dashboard />));

  const linkElement = screen.getAllByText(/Welcome to template application./i);
  expect(linkElement.length).toEqual(1);
});