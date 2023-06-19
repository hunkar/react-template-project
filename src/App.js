import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import DefaultLayout from "./layout/Dashboard";
import UserLayout from "./layout/UserLayout";
import { store } from "./store/store";
import { Provider } from "react-redux";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />} />
          <Route path="/users" element={<UserLayout />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
