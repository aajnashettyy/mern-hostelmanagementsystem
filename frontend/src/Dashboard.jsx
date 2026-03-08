// frontend/src/Dashboard.jsx

import { useEffect, useState } from "react";
import { fetchRooms, fetchStudents, fetchComplaints } from "./api";
import "./Dashboard.css";

export default function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const r = await fetchRooms();
        setRooms(r);
        const s = await fetchStudents();
        setStudents(s);
        const c = await fetchComplaints();
        setComplaints(c);
      } catch (e) {
        setErr("Failed to fetch data");
      }
    }
    fetchData();
  }, []);

  // Calculate full rooms
  const fullRooms = rooms.filter(room => {
    const count = students.filter(s => s.roomId === room._id).length;
    return count >= room.capacity;
  }).length;

  return (
    <div className="dash-main">
      <h1>Dashboard</h1>
      {err && <div style={{ color: "red", marginBottom: 16 }}>{err}</div>}
      <div className="dash-cards">
        <div className="card">
          <h3 style={{ color: '#4f46e5', marginBottom: 8 }}>Total Rooms</h3>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{rooms.length}</div>
        </div>
        <div className="card">
          <h3 style={{ color: '#10b981', marginBottom: 8 }}>Total Students</h3>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{students.length}</div>
        </div>
        <div className="card">
          <h3 style={{ color: '#ef4444', marginBottom: 8 }}>Full Rooms</h3>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{fullRooms}</div>
        </div>
        <div className="card">
          <h3 style={{ color: '#f59e42', marginBottom: 8 }}>Total Complaints</h3>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{complaints.length}</div>
        </div>
      </div>
    </div>
  );
}
