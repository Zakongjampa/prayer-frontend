import axios from "axios";
import { useState } from "react";
import { API_URL_PRAYERS } from "../../ApiUrls";

export default function InsertPecha() {
  const [data, setData] = useState({
    name: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(API_URL_PRAYERS, data);
      setData({ name: "", content: "" });
      setSuccess("ཞལ་འདོན་ནང་འཇུགས་བྱས་ཚར།");
    } catch (err) {
      setError(
        err.response?.data?.message || "ཞལ་འདོན་ནང་འཇུགས་བྱེད་ཐུབ་མ་སོང།",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="manuscript-page">
        <svg className="svg-filter-container">
          <filter id="torn-edges" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
        <div>
          <h3>ཞལ་འདོན་དཔེ་ཆ་ནང་འཇུགས་བྱེད་ཡུལ།</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fs-4">
                ཞལ་འདོན་གྱི་མིང།
              </label>
              <input
                id="name"
                type="text"
                className="form-control"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
              ></input>

              <label htmlFor="content" className="form-label fs-4">
                ཞལ་འདོན།
              </label>
              <textarea
                id="content"
                className="form-control"
                name="content"
                rows={10}
                style={{
                  minHeight: "420px",
                  minWidth: "600px",
                  maxWidth: "900px",
                }}
                value={data.content}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "བསྒུགས་པའི་སྒང་..." : "ནང་འཇུགས་གནང་རོགས།"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
