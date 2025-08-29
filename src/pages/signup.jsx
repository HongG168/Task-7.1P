// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../service/authApi";
import "../styles/auth.css";

export default function Signup() {
    const nav = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [hashPasswords, setHashPasswords] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        if (form.password !== form.confirm) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            await signUpUser({
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                email: form.email.trim(),
                password: form.password,
                hashPasswords,
            });
            nav("/login");
        } catch (err) {
            setError(err.message || "Sign up failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>DEV@Deakin</h1>
                <h2>Sign Up</h2>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="grid-2">
                        <label>
                            First Name
                            <input
                                value={form.firstName}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        firstName: e.target.value,
                                    })
                                }
                                placeholder="Sambath"
                                required
                            />
                        </label>

                        <label>
                            Last Name
                            <input
                                value={form.lastName}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        lastName: e.target.value,
                                    })
                                }
                                placeholder="Reach"
                                required
                            />
                        </label>
                    </div>

                    <label>
                        Email
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            placeholder="jane.doe@deakin.edu.au"
                            required
                        />
                    </label>

                    <div className="grid-2">
                        <label>
                            Password
                            <input
                                type="password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                                placeholder="At least 8 characters"
                                required
                                minLength={8}
                            />
                        </label>

                        <label>
                            Confirm password
                            <input
                                type="password"
                                value={form.confirm}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        confirm: e.target.value,
                                    })
                                }
                                placeholder="Re-enter password"
                                required
                                minLength={8}
                            />
                        </label>
                    </div>

                    <label className="checkbox">
                        <input
                            type="checkbox"
                            checked={hashPasswords}
                            onChange={(e) => setHashPasswords(e.target.checked)}
                        />
                        Hash passwords with bcryptjs (recommended)
                    </label>

                    {error && <div className="auth-error">{error}</div>}

                    <button className="auth-btn" disabled={loading}>
                        {loading ? "Creating account…" : "Create account"}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}
