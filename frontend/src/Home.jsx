// frontend/src/Home.jsx
import { Link } from "react-router-dom";

import Sidebar from "./Sidebar";
import "./Sidebar.css";

export default function Home() {
  return (
    <div style={{display:'flex',height:'100vh'}}>
      <Sidebar />
      <div className="home-container" style={{marginLeft:220, flex:1}}>
        <div className="home-title">🏨 Hostel Management System</div>
        <div className="home-sub">Modern MERN Admin Portal for Hostel Management</div>
        <div className="home-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn btn2">Register</Link>
        </div>
        <div style={{marginTop:40, color:'#6b7280', fontSize:16, maxWidth:400, textAlign:'center'}}>
          Admin can manage rooms, students, and complaints with a clean dashboard.<br/>
          Secure authentication, role-based access, and real-time capacity checks.
        </div>
      </div>
    </div>
  );
}
