import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeUser: null,
  isReadonly: false,
  userList: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    closeUserAddModal: (state) => {
      state.showUserDetail = false;
      state.activeUser = null;
      state.isReadonly = false;
    },
    deleteUser: (state, actions) => {
      state.userList = state.userList.filter(
        (user) => user.id !== actions.payload
      );
    },
    saveActiveUser: (state) => {
      const insertUser = state.activeUser;

      if (insertUser.id) {
        state.userList = state.userList.map((user) =>
          user.id === insertUser.id ? insertUser : user
        );
      } else {
        insertUser.id = Date.now();
        state.userList.push(insertUser);
      }

      state.showUserDetail = false;
      state.activeUser = null;
    },
    set: (state, action) => {
      state.userList = action.payload;
    },
    showUserAddModal: (state) => {
      state.showUserDetail = true;
      state.activeUser = {};
    },
    showUserDetailModal: (state, action) => {
      state.showUserDetail = true;
      state.isReadonly = true;
      state.activeUser = state.userList.find(
        (user) => user.id === action.payload
      );
    },
    showUserUpdateModal: (state, action) => {
      state.showUserDetail = true;
      state.activeUser = state.userList.find(
        (user) => user.id === action.payload
      );
    },
    updateActiveUser: (state, action) => {
      state.activeUser = {
        ...state.activeUser,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  closeUserAddModal,
  deleteUser,
  saveActiveUser,
  set,
  showUserAddModal,
  showUserDetailModal,
  showUserUpdateModal,
  updateActiveUser,
} = usersSlice.actions;

export default usersSlice.reducer;
