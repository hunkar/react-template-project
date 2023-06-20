import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App test suits", () => {
  describe("Path is /", () => {
    it("should show graphic screen.", () => {
      window.SVGPathElement = jest.fn();

      render(<App />);

      expect(
        screen.getByText(/Welcome to template application./i)
      ).toBeInTheDocument();
    });
  });

  describe("Path is /users", () => {
    let originalWindow;

    beforeAll(() => {
      originalWindow = window.location;
      delete window.location;

      window.location = new URL("http://localhost/users");
    });

    afterAll(() => {
      delete window.location;
      window.location = originalWindow;
    });

    it("should show user screen.", () => {
      render(<App />);

      expect(screen.getByText(/Users/i)).toBeInTheDocument();
    });
  });
});
