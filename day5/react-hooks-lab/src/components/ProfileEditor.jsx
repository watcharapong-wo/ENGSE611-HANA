// src/components/ProfileEditor.js
import React, { useState } from "react";

export default function ProfileEditor() {
  const [profile, setProfile] = useState({ firstName: "", lastName: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div style={{ display:"grid", gap:8 }}>
        <div>
          <label>First name</label>
          <input name="firstName" value={profile.firstName} onChange={handleChange} />
        </div>
        <div>
          <label>Last name</label>
          <input name="lastName" value={profile.lastName} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} />
        </div>
      </div>
      <hr />
      <ul>
        <li>First Name: <strong>{profile.firstName || "—"}</strong></li>
        <li>Last Name: <strong>{profile.lastName || "—"}</strong></li>
        <li>Email: <strong>{profile.email || "—"}</strong></li>
      </ul>
    </div>
  );
}
