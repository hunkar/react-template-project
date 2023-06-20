import { configureStore } from "@reduxjs/toolkit";
import usersReducer, {
  closeUserAddModal,
  deleteUser,
  saveActiveUser,
  set,
  showUserAddModal,
  showUserDetailModal,
  showUserUpdateModal,
  updateActiveUser,
} from "../users";

describe("Users reducer test suit", () => {
  test("Default state", () => {
    const store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });

    const state = store.getState().users;
    expect(state).toEqual({
      activeUser: null,
      isReadonly: false,
      userList: [],
    });
  });

  it("should close user add modal", async () => {
    const store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });

    await store.dispatch(closeUserAddModal());

    const state = store.getState().users;
    expect(state).toEqual(
      expect.objectContaining({
        activeUser: null,
        isReadonly: false,
        showUserDetail: false,
      })
    );
  });

  it("should set userList", async () => {
    const store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });

    const mockUser = { id: "1", name: "testName" };

    await store.dispatch(set([mockUser]));
    expect(store.getState().users.userList).toEqual([mockUser]);
  });

  it("should delete user", async () => {
    const store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });

    const mockUser = { id: "1", name: "testName" };

    await store.dispatch(set([mockUser]));
    await store.dispatch(deleteUser(mockUser.id));
    expect(store.getState().users.userList).toEqual([]);
  });

  it("should show user add modal", async () => {
    const store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });

    await store.dispatch(showUserAddModal());
    expect(store.getState().users).toEqual(
      expect.objectContaining({
        showUserDetail: true,
        activeUser: {},
      })
    );
  });

  it("should show user detail readonly", async () => {
    const store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });

    const mockUser = { id: "1", name: "testName" };

    await store.dispatch(set([mockUser]));

    await store.dispatch(showUserDetailModal(mockUser.id));
    expect(store.getState().users).toEqual(
      expect.objectContaining({
        showUserDetail: true,
        isReadonly: true,
        activeUser: mockUser,
      })
    );
  });

  it("should show user detail to update", async () => {
    const store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });

    const mockUser = { id: "1", name: "testName" };

    await store.dispatch(set([mockUser]));

    await store.dispatch(showUserUpdateModal(mockUser.id));
    expect(store.getState().users).toEqual(
      expect.objectContaining({
        showUserDetail: true,
        isReadonly: false,
        activeUser: mockUser,
      })
    );
  });

  it("should show update active user", async () => {
    const store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });

    const mockUser = { id: "1", name: "testName" };

    await store.dispatch(set([mockUser]));
    await store.dispatch(showUserUpdateModal(mockUser.id));
    await store.dispatch(updateActiveUser({ name: "testNameUpdated" }));

    expect(store.getState().users).toEqual(
      expect.objectContaining({
        activeUser: { ...mockUser, name: "testNameUpdated" },
      })
    );
  });

  it("should update userList", async () => {
    const store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });

    const mockUser = { id: "1", name: "testName" };

    await store.dispatch(set([mockUser]));
    await store.dispatch(showUserUpdateModal(mockUser.id));
    await store.dispatch(updateActiveUser({ name: "testNameUpdated" }));
    await store.dispatch(saveActiveUser());

    expect(store.getState().users).toEqual(
      expect.objectContaining({
        userList: [{ ...mockUser, name: "testNameUpdated" }],
        activeUser: null,
      })
    );
  });

  it("should insert to userList", async () => {
    const store = configureStore({
      reducer: {
        users: usersReducer,
      },
    });

    const mockUser = { id: "1", name: "testName" };

    await store.dispatch(showUserAddModal());
    await store.dispatch(updateActiveUser({ name: mockUser.name }));
    await store.dispatch(saveActiveUser());

    expect(store.getState().users).toEqual(
      expect.objectContaining({
        userList: [expect.objectContaining({ name: mockUser.name })],
        activeUser: null,
      })
    );
  });
});
