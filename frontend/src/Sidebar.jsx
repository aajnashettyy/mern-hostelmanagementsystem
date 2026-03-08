import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="side-title">🏨 Hostel</h2>

      <ul>
        <li><Link to="/dashboard">📊 Dashboard</Link></li>
        <li><Link to="/rooms">🛏 Rooms</Link></li>
        <li><Link to="/students">👨‍🎓 Students</Link></li>
        <li><Link to="/complaints">📩 Complaints</Link></li>

        <li className="logout">
          <Link to="/login" onClick={() => localStorage.clear()}>
            🚪 Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
