// src/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    window.location.href = "/login";
  }

  return (
    <nav className="nav" style={{position:'relative'}}>
      <div style={{position:'absolute',left:0,right:0,top:0,bottom:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}>
        <span style={{fontWeight:700,fontSize:20,letterSpacing:1}}>Hostel Management System</span>
      </div>
      <div className="nav-right" style={{zIndex:1,marginLeft:'auto'}}>
        {localStorage.getItem("token") ? (
          <>
            <span style={{marginRight:12}}>{name} ({role})</span>
            <button className="btn-link" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
