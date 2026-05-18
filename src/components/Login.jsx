import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL_LOGIN } from "../../ApiUrls";
import { setLocalStorage } from "../Tool";

export default function Login({ setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(API_URL_LOGIN, {
        username: username,
        password: password,
      });

      setLocalStorage(response);
      setUserId(response.data.id);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-bold">
            མིང་བྱང།། :
          </label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="form-text">མཐོ་འཇུགས་སྐབས་ཀྱི་མིང་བྱང་དེ་བྲིས།།</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            གསང་ཚིག།། :
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="form-text">གསང་བ།། ང་ཚོས་ཀྱང་རིག་མི་ཐུབ།།</div>
        </div>
        <button
          type="submit"
          className="btn btn-primary p-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "ནང་བཞུགས།།"}
        </button>
        <button className="btn btn-secondary ms-4 p-2">
          <Link to="/signup">ཐོ་དགོད།།</Link>
        </button>
      </form>
    </div>
  );
}
