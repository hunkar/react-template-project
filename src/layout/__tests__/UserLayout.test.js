import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import UserLayout from "../UserLayout";
import usersReducer from "../../store/reducers/users";
import { configureStore } from "@reduxjs/toolkit";

const getMockStore = () => {
  return configureStore({
    reducer: {
      users: usersReducer,
    },
  });
};

describe("User layout test sutite", () => {
  describe("render", () => {
    it("should be rendered without any user", () => {
      render(
        <Provider store={getMockStore()}>
          <UserLayout></UserLayout>
        </Provider>
      );

      expect(screen.getByText(/There is no user!/i)).toBeInTheDocument();
    });
  });

  describe("actions", () => {
    const addUser = () => {
      fireEvent.click(screen.getByRole("button-new-user"));

      fireEvent.change(screen.getByRole("input-name"), {
        target: { value: "testName" },
      });

      fireEvent.change(screen.getByRole("input-surname"), {
        target: { value: "testSurname" },
      });

      fireEvent.change(screen.getByRole("input-department"), {
        target: { value: "testDepartment" },
      });

      fireEvent.change(screen.getByRole("input-skills"), {
        target: { value: "testSkill" },
      });

      fireEvent.click(screen.getByRole("submit-user"));
    };

    it("should open user modal", () => {
      render(
        <Provider store={getMockStore()}>
          <UserLayout></UserLayout>
        </Provider>
      );

      fireEvent.click(screen.getByRole("button-new-user"));

      expect(screen.getByRole("submit-user")).toBeInTheDocument();
    });

    it("should close user modal", () => {
      render(
        <Provider store={getMockStore()}>
          <UserLayout></UserLayout>
        </Provider>
      );

      fireEvent.click(screen.getByRole("button-new-user"));
      fireEvent.click(screen.getByRole("button-close-modal"));

      expect(() => screen.getByRole("submit-user")).toThrowError();
    });

    it("should add user", () => {
      render(
        <Provider store={getMockStore()}>
          <UserLayout></UserLayout>
        </Provider>
      );

      addUser();

      expect(screen.getByText(/testName/i)).toBeInTheDocument();
      expect(() => screen.getByRole("submit-user")).toThrowError();
    });

    it("should show detail of user", () => {
      render(
        <Provider store={getMockStore()}>
          <UserLayout></UserLayout>
        </Provider>
      );

      addUser();

      fireEvent.click(screen.getByRole("detail-user"));

      expect(screen.getByRole("input-name")).toHaveValue("testName");
      expect(() => screen.getByRole("submit-user")).toThrowError();
    });

    it("should update user", () => {
      render(
        <Provider store={getMockStore()}>
          <UserLayout></UserLayout>
        </Provider>
      );

      addUser();

      fireEvent.click(screen.getByRole("update-user"));

      fireEvent.change(screen.getByRole("input-name"), {
        target: { value: "testNameUpdated" },
      });
      fireEvent.change(screen.getByRole("input-surname"), {
        target: { value: "surnameUpdated" },
      });
      fireEvent.change(screen.getByRole("input-department"), {
        target: { value: "departmentUpdated" },
      });
      fireEvent.change(screen.getByRole("input-skills"), {
        target: { value: "skillsUpdated" },
      });

      fireEvent.click(screen.getByRole("submit-user"));

      expect(screen.getByText(/testNameUpdated/i)).toBeInTheDocument();
      expect(screen.getByText(/surnameUpdated/i)).toBeInTheDocument();
      expect(screen.getByText(/departmentUpdated/i)).toBeInTheDocument();
      expect(screen.getByText(/skillsUpdated/i)).toBeInTheDocument();

      expect(() => screen.getByRole("submit-user")).toThrowError();
    });

    it("should delete user", () => {
      render(
        <Provider store={getMockStore()}>
          <UserLayout></UserLayout>
        </Provider>
      );

      addUser();

      fireEvent.click(screen.getByRole("delete-user"));

      expect(() => screen.getByText(/testName/i)).toThrowError();
      expect(() => screen.getByRole("submit-user")).toThrowError();
    });
  });
});
