import { Link } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Hostel</h2>

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/rooms">Rooms</Link>
          <Link to="/students">Students</Link>
          <Link to="/complaints">Complaints</Link>
          <Link to="/login" className="logout">Logout</Link>
        </nav>
      </aside>

      {/* Page content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

