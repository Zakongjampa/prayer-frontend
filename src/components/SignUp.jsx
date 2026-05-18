import axios from "axios";
import { useState } from "react";
import { API_URL_USERS } from "../../ApiUrls";

export default function SignUp() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (
      !data.first_name ||
      !data.last_name ||
      !data.username ||
      !data.password ||
      !data.email
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (data.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(API_URL_USERS, data);
      setSuccess(true);
      setData({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        email: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">
          Registration successful! You can now log in.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            value={data.first_name}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Last Name :
          </label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            value={data.last_name}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username">User Name : </label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={data.username}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={data.password}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
            minLength="6"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email : </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={data.email}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
