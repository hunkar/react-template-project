import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import UserList from "../UserList";
import UserModal from "../UserModal";

export const getUserListComponentWithProvider = (store) => {
  return (
    <Provider store={store}>
      <UserList />
    </Provider>
  );
};

export const getUserModalComponentWithProvider = (store) => {
  return (
    <Provider store={store}>
      <UserModal />
    </Provider>
  );
};

export const getMockedUserStore = (
  initialState = {
    activeUser: null,
    isReadonly: false,
    userList: [],
  },
  reducers = {}
) => {
  const store = configureStore({
    reducer: {
      users: createSlice({
        name: "users",
        initialState,
        reducers,
      }).reducer,
    },
  });

  return store;
};
