import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ThumbsUp } from "lucide-react";

export default function Pecha({
  prayers,
  userId,
  likedPrayers,
  handleLikeButton,
}) {
  const { id } = useParams();
  const [prayer, setPrayer] = useState(
    prayers.filter((prayer) => prayer.number == id),
  );
  let liked = likedPrayers.includes(+id);

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
        <h2>{prayer[0].name}</h2>
        <div className="fs-4">
          <ReactMarkdown>{prayer[0].content || ""}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
