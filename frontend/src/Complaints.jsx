// src/Complaints.jsx
import { useEffect, useState } from "react";
import { fetchComplaints, addComplaint, updateComplaintStatus } from "./api";
import "./Rooms.css";

const statusOptions = ["Pending", "In-progress", "Resolved"];

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setComplaints(await fetchComplaints());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    await addComplaint(title, description);
    setTitle(""); setDescription("");
    load();
  }

  async function handleStatusChange(id, status) {
    await updateComplaintStatus(id, status);
    load();
  }


  return (
    <div className="dash-content" style={{paddingLeft: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
      <h1 className="page-title" style={{textAlign: 'center', marginTop: 32}}>Complaints</h1>
      <form className="add-form card" onSubmit={handleAdd} style={{maxWidth: 500, width: '100%', margin: '24px auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="input-field" style={{maxWidth: 350}} />
        <input required value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="input-field" style={{maxWidth: 350}} />
        <button type="submit" className="register-btn" style={{maxWidth: 350}}>Add Complaint</button>
      </form>
      {loading ? <div>Loading...</div> : (
        <div className="card" style={{width: '100%', maxWidth: 900, margin: '0 auto', padding: '0 0 24px 0', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <table className="data-table" style={{width: '100%', maxWidth: 850}}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Change Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => (
                <tr key={c._id}>
                  <td>{c.title}</td>
                  <td>{c.description}</td>
                  <td>{c.status}</td>
                  <td>
                    <select value={c.status} onChange={e=>handleStatusChange(c._id, e.target.value)}>
                      {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </td>
                  <td>{new Date(c.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
