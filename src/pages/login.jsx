import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../service/authApi";
import "../styles/auth.css";

export default function Login() {
    const nav = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await loginUser(form);
            nav("/home");
        } catch (err) {
            setError(err.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    }

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
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            placeholder="you@example.com"
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
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
