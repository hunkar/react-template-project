import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import DefaultLayout from "./layout/Dashboard";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
