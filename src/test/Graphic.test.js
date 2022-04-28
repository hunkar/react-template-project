import { render, screen } from "@testing-library/react";
import Graphic from "../components/Graphic";

test("Don't render graphic if data is null.", () => {
  render(<Graphic title={"test graphic"} data={[]} />);
  const linkElement = screen.getByText(/test graphic/i);
  expect(linkElement).toBeInTheDocument();
});

test("Dont render graphic if data is empty array.", () => {
  render(<Graphic title={"test graphic"} data={[]} />);
  const linkElement = screen.getByText(/There is no data available/i);
  expect(linkElement).toBeInTheDocument();
});

test("Render graphic if data has length.", () => {
  window.SVGPathElement = jest.fn();
  const { container } = render(
    <Graphic
      title={"test graphic"}
      data={[
        {
          date: new Date(),
          value: 105,
        },
      ]}
    />
  );

  expect(container.getElementsByClassName("c3").length).toBe(1);
});
