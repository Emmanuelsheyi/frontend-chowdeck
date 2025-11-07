import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Email and password are required");
    setLoading(true);
    try {
      const resp = await axios.post("/api/auth/login", { email, password });
      const data = resp && resp.data ? resp.data : {};
      const token = data.token || data.access_token || data.authToken;
      if (token) localStorage.setItem("authToken", token);
      navigate("/vendors");
    } catch (err) {
      const msg =
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-form">
          <h2 className="login-title">Sign In</h2>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-row">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div
              className="form-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link
                to="/forgot"
                style={{ fontSize: 13, color: "var(--muted)" }}
              >
                Forgot passwords?
              </Link>
              <button
                type="submit"
                className="btn signup-btn"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>

          <p className="muted">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;