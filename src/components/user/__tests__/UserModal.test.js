import { fireEvent, render, screen } from "@testing-library/react";
import {
  getUserModalComponentWithProvider,
  getMockedUserStore,
} from "./UserTestUtil";

describe("userModal test cases", () => {
  describe("render data", () => {
    test("render with no data", () => {
      const { container } = render(
        getUserModalComponentWithProvider(
          getMockedUserStore({
            activeUser: {},
          })
        )
      );

      expect(screen.getByRole("input-name")).toHaveValue("");
      expect(screen.getByRole("input-surname")).toHaveValue("");
      expect(screen.getByRole("input-department")).toHaveValue("");
      expect(screen.getByRole("input-skills")).toHaveValue("");
    });

    test("render with user", () => {
      const activeUser = {
        id: "1",
        name: "testUser",
        surname: "testUserName",
        department: "test",
        skills: ["test", "development"],
      };

      render(
        getUserModalComponentWithProvider(
          getMockedUserStore({
            activeUser,
          })
        )
      );

      expect(screen.getByRole("input-name")).toHaveValue(activeUser.name);
      expect(screen.getByRole("input-surname")).toHaveValue(activeUser.surname);
      expect(screen.getByRole("input-department")).toHaveValue(
        activeUser.department
      );
      expect(screen.getByRole("input-skills")).toHaveValue(
        activeUser.skills.join(",")
      );
    });

    test("render readonly", () => {
      const activeUser = {
        id: "1",
        name: "testUser",
        surname: "testUserName",
        department: "test",
        skills: ["test", "development"],
      };

      render(
        getUserModalComponentWithProvider(
          getMockedUserStore({
            activeUser,
            isReadonly: true,
          })
        )
      );

      expect(screen.getByRole("input-name")).toHaveAttribute("readonly");
      expect(screen.getByRole("input-surname")).toHaveAttribute("readonly");
      expect(screen.getByRole("input-department")).toHaveAttribute("readonly");
      expect(screen.getByRole("input-skills")).toHaveAttribute("readonly");

      expect(() => screen.getByRole("submit-user")).toThrow();
    });
  });

  describe("User actions", () => {
    const activeUser = {};

    const closeUserAddModal = jest.fn();
    const saveActiveUser = jest.fn();
    const updateActiveUser = jest.fn();

    afterAll(() => {
      jest.clearAllMocks();
    });

    const store = getMockedUserStore(
      { activeUser },
      { closeUserAddModal, updateActiveUser, saveActiveUser }
    );

    test("close modal", () => {
      render(getUserModalComponentWithProvider(store));

      fireEvent.click(screen.getByRole("button-close-modal"));

      expect(closeUserAddModal).toHaveBeenCalledTimes(1);
    });

    test("save active user", () => {
      render(getUserModalComponentWithProvider(store));

      fireEvent.click(screen.getByRole("submit-user"));

      expect(saveActiveUser).toHaveBeenCalledTimes(1);
    });

    test("update fields", () => {
      render(getUserModalComponentWithProvider(store));

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

      expect(updateActiveUser).toHaveBeenCalledTimes(4);
    });
  });
});
