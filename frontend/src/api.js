// COMPLAINTS
export async function fetchComplaints() {
  const res = await fetch(`${API_URL}/complaints`);
  return await res.json();
}

export async function addComplaint(title, description) {
  const res = await fetch(`${API_URL}/complaints`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  });
  return await res.json();
}

export async function updateComplaintStatus(id, status) {
  const res = await fetch(`${API_URL}/complaints/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  return await res.json();
}
// src/api.js
const API_URL = "http://localhost:5000";

// AUTH
export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res;
  } catch (err) {
    console.error("loginUser err:", err);
    // create a fake Response-like object so caller can do res.ok / res.json()
    return {
      ok: false,
      json: async () => ({ error: "Failed to connect to server" }),
    };
  }
}

export async function registerUser(data) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res;
  } catch (err) {
    console.error("registerUser err:", err);
    return {
      ok: false,
      json: async () => ({ error: "Failed to connect to server" }),
    };
  }
}

// ROOMS
export async function fetchRooms() {
  const res = await fetch(`${API_URL}/rooms`);
  return await res.json();
}
export async function addRoom(roomNumber, capacity) {
  try {
    const res = await fetch(`${API_URL}/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomNumber, capacity }),
    });
    return await res.json();
  } catch (err) {
    return { error: "Failed to add room" };
  }
}
export async function deleteRoom(id) {
  await fetch(`${API_URL}/rooms/${id}`, { method: "DELETE" });
}

// STUDENTS
export async function fetchStudents() {
  const res = await fetch(`${API_URL}/students`);
  return await res.json();
}
export async function addStudent(payload) {
  try {
    const res = await fetch(`${API_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res;
  } catch (err) {
    return {
      ok: false,
      json: async () => ({ error: "Failed to connect to server" }),
    };
  }
}
export async function deleteStudent(id) {
  await fetch(`${API_URL}/students/${id}`, { method: "DELETE" });
}
