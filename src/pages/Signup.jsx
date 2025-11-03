import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// styles moved to src/index.css

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Email is invalid";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6)
      errs.password = "Password must be at least 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;
    setLoading(true);

    try {
      const resp = await axios.post("/api/auth/signup", {
        name,
        email,
        phone,
        password,
      });
      const data = resp && resp.data ? resp.data : {};
      const token = data.token || data.access_token || data.authToken;
      if (token) localStorage.setItem("authToken", token);
      navigate("/vendors");
    } catch (err) {
      const msg =
        err && err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message || "Something went wrong. Please try again.";
      setErrors({ form: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-form">
          <h2 className="signup-title">Create an account</h2>
          {errors.form && <div className="error">{errors.form}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label className="form-label">Full name</label>
              <input
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
              {errors.name && <div className="field-error">{errors.name}</div>}
            </div>

            <div className="form-row">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              {errors.email && (
                <div className="field-error">{errors.email}</div>
              )}
            </div>

            <div className="form-row">
              <label className="form-label">Phone</label>
              <input
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              {errors.password && (
                <div className="field-error">{errors.password}</div>
              )}
            </div>

            <div className="form-row">
              <button
                type="submit"
                className="btn signup-btn"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </form>

          <p className="muted">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
