// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Mainpage from "./components/Mainpage";
import Instruction from "./components/Instruction";
import AboutUs from "./components/AboutUs";

const App = () => {
  const [open, setOpen] = useState(true);

  return (
    <Router>

      <div className="flex">
        {/* Sidebar Component */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* Main Content */}
        <div className="p-7 flex-1">
          <Routes>
            <Route path="/" element={<Mainpage/>} />
            <Route path="/instruction" element={<Instruction/>} />
            <Route path="/about-us" element={<AboutUs/>} />
          </Routes>
        </div>
      </div>
    </Router>

  );
};

export default App;
