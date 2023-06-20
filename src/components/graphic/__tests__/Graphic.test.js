import { render, screen } from "@testing-library/react";
import Graphic from "../Graphic";

describe("Component should be rendered correctly", () => {
  test("render with no data and no title", () => {
    render(<Graphic title={"test graphic"} />);
    const linkElement = screen.getByText(/test graphic/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("render with title and no data", () => {
    render(<Graphic title={"test graphic"} data={[]} />);
    const linkElement = screen.getByText(/There is no data available/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("render with title and data", () => {
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
});
