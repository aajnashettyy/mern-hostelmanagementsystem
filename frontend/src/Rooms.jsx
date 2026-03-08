// src/Rooms.jsx

import { useEffect, useState } from "react";
import { fetchRooms, addRoom, deleteRoom } from "./api";
import "./Rooms.css";



export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [modal, setModal] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const role = localStorage.getItem("role");

  async function load() {
    const r = await fetchRooms();
    setRooms(r);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    const res = await addRoom(roomNumber, Number(capacity));
    if (res.error) setModal(res.error || "Add failed");
    else {
      setRoomNumber("");
      setCapacity(1);
      load();
    }
  }

  async function confirmDelete() {
    if (deleteId) {
      await deleteRoom(deleteId);
      setDeleteId(null);
      load();
    }
  }


  return (
    <div className="dash-content" style={{paddingLeft: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
      <h1 className="page-title" style={{textAlign: 'center', marginTop: 32}}>Rooms</h1>

      {role === "admin" && (
        <form className="add-form card" style={{maxWidth: 500, width: '100%', margin: '24px auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={handleAdd}>
          <input required value={roomNumber} onChange={e=>setRoomNumber(e.target.value)} placeholder="Room Number" className="input-field" style={{maxWidth: 350}} />
          <input required type="number" min="1" value={capacity} onChange={e=>setCapacity(e.target.value)} placeholder="Capacity" className="input-field" style={{maxWidth: 350}} />
          <button type="submit" className="register-btn" style={{maxWidth: 350}}>Add Room</button>
        </form>
      )}

      <div className="card" style={{width: '100%', maxWidth: 900, margin: '0 auto', padding: '0 0 24px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <table className="data-table" style={{width: '100%', maxWidth: 850}}>
          <thead><tr><th>Room No</th><th>Capacity</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {rooms.map(r => (
              <tr key={r._id}>
                <td>{r.roomNumber}</td>
                <td>{r.capacity}</td>
                <td>{r.status}</td>
                <td>
                  {role === "admin" ? <button onClick={()=>setDeleteId(r._id)} className="delete-btn">Delete</button> : <span>-</span>}
                </td>
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
            <h3 style={{color:'#ef4444',marginBottom:12}}>Delete Room</h3>
            <div style={{marginBottom:18}}>Are you sure you want to delete this room?</div>
            <button onClick={confirmDelete} style={{background:'#ef4444',color:'#fff',border:'none',padding:'10px 22px',borderRadius:8,cursor:'pointer',marginRight:12}}>Delete</button>
            <button onClick={()=>setDeleteId(null)} style={{background:'#4f46e5',color:'#fff',border:'none',padding:'10px 22px',borderRadius:8,cursor:'pointer'}}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
