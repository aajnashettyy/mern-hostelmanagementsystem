// src/Students.jsx

import "./Students.css";
import { useEffect, useState } from "react";
import { fetchStudents, fetchRooms, addStudent, deleteStudent } from "./api";



export default function Students() {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roomId, setRoomId] = useState("");
  const [modal, setModal] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const role = localStorage.getItem("role");

  async function load() {
    const s = await fetchStudents();
    setStudents(s);
    const r = await fetchRooms();
    setRooms(r);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const res = await addStudent({ name, phone, roomId });
    const data = await res.json();

    if (!res.ok) {
      setModal(data.error || "Failed to add student");
      return;
    }

    setName(""); setPhone(""); setRoomId("");
    load();
  }

  async function confirmDelete() {
    if (deleteId) {
      await deleteStudent(deleteId);
      setDeleteId(null);
      load();
    }
  }


  return (
    <div className="dash-content" style={{paddingLeft: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
      <h1 className="page-title" style={{textAlign: 'center', marginTop: 32}}>Students</h1>

      {role === "admin" && (
        <form className="add-form card" style={{maxWidth: 500, width: '100%', margin: '24px auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={handleAdd}>
          <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Student Name" className="input-field" style={{maxWidth: 350}} />
          <input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone No." className="input-field" style={{maxWidth: 350}} />
          <select required value={roomId} onChange={e=>setRoomId(e.target.value)} className="input-field" style={{maxWidth: 350}}>
            <option value="">Select Room</option>
            {rooms.map(room => (
              <option key={room._id} value={room._id}>
                {room.roomNumber} — Capacity: {room.capacity}
              </option>
            ))}
          </select>
          <button type="submit" className="register-btn" style={{maxWidth: 350}}>Add Student</button>
        </form>
      )}

      <div className="card" style={{width: '100%', maxWidth: 900, margin: '0 auto', padding: '0 0 24px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <table className="data-table" style={{width: '100%', maxWidth: 850}}>
          <thead><tr><th>Name</th><th>Phone</th><th>Room</th><th>Delete</th></tr></thead>
          <tbody>
            {students.map(s => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.phone}</td>
                <td>{rooms.find(r => r._id === s.roomId)?.roomNumber || "Unknown"}</td>
                <td>{role==="admin" ? <button className="delete-btn" onClick={()=>setDeleteId(s._id)}>Delete</button> : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}} onClick={()=>setModal("")}> 
          <div style={{background:'#fff',padding:32,borderRadius:12,boxShadow:'0 8px 32px rgba(0,0,0,0.18)',minWidth:300}} onClick={e=>e.stopPropagation()}>
            <h3 style={{color:'#ef4444',marginBottom:12}}>Error</h3>
            <div style={{marginBottom:18}}>{modal}</div>
            <button onClick={()=>setModal("")} style={{background:'#4f46e5',color:'#fff',border:'none',padding:'10px 22px',borderRadius:8,cursor:'pointer'}}>Close</button>
          </div>
        </div>
      )}

      {deleteId && (
        <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.2)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}} onClick={()=>setDeleteId(null)}>
          <div style={{background:'#fff',padding:32,borderRadius:12,boxShadow:'0 8px 32px rgba(0,0,0,0.18)',minWidth:300}} onClick={e=>e.stopPropagation()}>
            <h3 style={{color:'#ef4444',marginBottom:12}}>Delete Student</h3>
            <div style={{marginBottom:18}}>Are you sure you want to delete this student?</div>
            <button onClick={confirmDelete} style={{background:'#ef4444',color:'#fff',border:'none',padding:'10px 22px',borderRadius:8,cursor:'pointer',marginRight:12}}>Delete</button>
            <button onClick={()=>setDeleteId(null)} style={{background:'#4f46e5',color:'#fff',border:'none',padding:'10px 22px',borderRadius:8,cursor:'pointer'}}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
