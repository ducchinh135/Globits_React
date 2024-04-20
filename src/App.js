import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Countries from "./components/Countries";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Menu />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
