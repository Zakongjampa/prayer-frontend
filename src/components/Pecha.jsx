import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ThumbsUp } from "lucide-react";
import axios from "axios";
import { API_URL_PRAYER_ID } from "../../ApiUrls";

export default function Pecha({ userId, likedPrayers, handleLikeButton }) {
  const { id } = useParams();
  const [prayer, setPrayer] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL_PRAYER_ID + id)
      .then((response) => setPrayer(response.data))
      .catch((err) => setError("Failed to fetch the Prayer: " + err.message))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="container mt-5">Loading prayer...</div>;
  }

  if (error) {
    return <div className="container mt-5">{error}</div>;
  }

  if (!prayer) {
    return <div className="container mt-5">Prayer not found.</div>;
  }

  const liked = likedPrayers.includes(+id);

  return (
    <div className="container mt-5 manuscript-page">
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
        <div>
          <Link to="/" className="btn btn-secondary mb-3">
            ← Back to List
          </Link>

          {userId != null ? (
            <button
              onClick={() => handleLikeButton(+id)}
              style={{ marginLeft: "90px" }}
            >
              <ThumbsUp size={40} fill={liked ? "red" : "none"} />
            </button>
          ) : null}
        </div>
        <h2>{prayer.name}</h2>
        <div className="fs-4">
          <ReactMarkdown>{prayer.content || ""}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
