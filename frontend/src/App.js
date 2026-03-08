// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import Rooms from "./Rooms";
import Students from "./Students";
import Complaints from "./Complaints";
import Sidebar from "./Sidebar";
import "./Sidebar.css";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <div style={{ flex: 1, marginLeft: 120 }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/complaints" element={<Complaints />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
