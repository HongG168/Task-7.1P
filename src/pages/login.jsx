import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../service/authApi";
import { auth } from "../service/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../styles/auth.css";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); // track logged-in user
  const [msg, setMsg] = useState("");

  // watch for login state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser(form);
      nav("/home"); // redirect after login
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    setMsg("");
    try {
      await signOut(auth);
      setMsg("👋 You have signed out.");
    } catch (err) {
      setMsg("❌ " + err.message);
    }
  }

  // If user is logged in, show sign out screen instead of login form
  if (user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>Dev@Deakin</h1>
          <h2>Welcome, {user.email}</h2>
          <p>You are logged in.</p>
          <button className="auth-btn" onClick={handleSignOut}>
            Sign Out
          </button>
          {msg && <p className="auth-footer">{msg}</p>}
        </div>
      </div>
    );
  }

  // Normal login form (if not logged in)
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Dev@Deakin</h1>
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-btn" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
