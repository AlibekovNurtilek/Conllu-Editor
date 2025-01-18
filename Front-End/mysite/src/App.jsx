// src/App.jsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="p-7 flex-1">
        <h1 className="text-2xl font-semibold">Homepage</h1>
      </div>
    </div>
  );
};

export default App;
