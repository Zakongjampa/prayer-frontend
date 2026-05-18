import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_LIKES, API_URL_PRAYERS } from "../../ApiUrls";
import ReactMarkdown from "react-markdown";
import { ThumbsUp } from "lucide-react";
import useLiked from "../hooks/useLiked";

export default function Pecha() {
  const { id } = useParams();
  const [prayer, setPrayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [like, setLike] = useState(false);
  const loginData = localStorage.getItem("username");
  const url = API_URL_LIKES + "/" + localStorage.getItem("id") + "/" + id;
  const { likedPrayers, loading: likedLoading, error: likedError } = useLiked();

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL_PRAYERS}/${id}`)
        .then((res) => setPrayer(res.data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
    setLike(likedPrayers.includes(id));
    console.log(url);
  }, [id]);

  const handleLikeButton = () => {
    if (like) {
      setLike(false);
      console.log(url);
      axios
        .delete(url)
        .then((res) =>
          res.status
            ? alert(
                "ཁྱེད་ཀྱི་ཞལ་འདོན་" +
                  prayer.name +
                  "ལ་དགའ་རྟགས་མེད་པ་བཟོ་འངུག།",
              )
            : null,
        )
        .catch((error) => console.log(error));
    } else {
      setLike(true);
      axios
        .post(url)
        .then((res) =>
          res.status
            ? alert(
                "ཁྱེད་ཀྱི་ཞལ་འདོན་" + prayer.name + "ལ་དགའ་རྟགས་སྤྲོད་འངུག།",
              )
            : null,
        )
        .catch((error) => console.log(error));
    }
  };

  if (loading)
    return (
      <div className="container mt-5">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="container mt-5">
        <p>Error: {error}</p>
      </div>
    );
  if (!prayer)
    return (
      <div className="container mt-5">
        <p>Prayer not found</p>
      </div>
    );

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

          {loginData ? (
            <button onClick={handleLikeButton} style={{ marginLeft: "90px" }}>
              <ThumbsUp size={40} fill={like ? "red" : "none"} />
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
