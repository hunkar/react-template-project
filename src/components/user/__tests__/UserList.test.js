import { fireEvent, render, screen } from "@testing-library/react";
import {
  getUserListComponentWithProvider,
  getMockedUserStore,
} from "./UserTestUtil";

describe("UserList test cases", () => {
  const deleteUser = jest.fn();
  const showUserDetailModal = jest.fn();
  const showUserUpdateModal = jest.fn();

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("render data", () => {
    test("render with no data", () => {
      const { container } = render(
        getUserListComponentWithProvider(getMockedUserStore())
      );

      const idHeader = screen.getByText(/^id$/i);
      const nameHeader = screen.getByText(/^name$/i);
      const surnameHeader = screen.getByText(/^surname$/i);
      const departmentHeader = screen.getByText(/^department$/i);
      const skillsHeader = screen.getByText(/^skills$/i);

      expect(idHeader).toBeInTheDocument();
      expect(nameHeader).toBeInTheDocument();
      expect(surnameHeader).toBeInTheDocument();
      expect(departmentHeader).toBeInTheDocument();
      expect(skillsHeader).toBeInTheDocument();
      expect(container.getElementsByTagName("td").length).toEqual(0);
    });

    test("render with user", () => {
      render(
        getUserListComponentWithProvider(
          getMockedUserStore({
            userList: [
              {
                id: "1",
                name: "testUser",
                surname: "testUserName",
                department: "test",
                skills: ["test", "development"],
              },
            ],
          })
        )
      );

      expect(screen.getByText(/^testUser$/i)).toBeInTheDocument();
    });
  });

  describe("action buttons", () => {
    const mockUser = [
      {
        id: "1",
        name: "testUser",
        surname: "testUserName",
        department: "test",
        skills: ["test", "development"],
      },
    ];

    const store = getMockedUserStore(
      { userList: mockUser },
      { deleteUser, showUserDetailModal, showUserUpdateModal }
    );

    test("delete user", () => {
      render(getUserListComponentWithProvider(store));

      fireEvent.click(screen.getByRole("delete-user"));

      expect(deleteUser).toHaveBeenCalledTimes(1);
    });

    test("detail user", () => {
      render(getUserListComponentWithProvider(store));

      fireEvent.click(screen.getByRole("detail-user"));

      expect(showUserDetailModal).toHaveBeenCalledTimes(1);
    });

    test("update user", () => {
      render(getUserListComponentWithProvider(store));

      fireEvent.click(screen.getByRole("update-user"));

      expect(showUserUpdateModal).toHaveBeenCalledTimes(1);
    });
  });
});
