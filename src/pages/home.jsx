// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { logout, getSession } from "../service/authApi";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getSession());
  }, []);

  function handleLogout() {
    logout();
    nav("/login");
  }

  return (
    <div style={{ maxWidth: 720, margin: "4rem auto", padding: "0 1rem" }}>
      <h1>Welcome to DEV@Deakin</h1>
      {user ? (
        <p>
          Signed in as{" "}
          <strong>
            {user.firstName} {user.lastName}
          </strong>{" "}
          ({user.email})
        </p>
      ) : (
        <p>Loading…</p>
      )}
      <button
        onClick={handleLogout}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1rem",
          borderRadius: 12,
          border: "1px solid #ddd",
          cursor: "pointer",
        }}
      >
        Log out
      </button>
    </div>
  );
}
