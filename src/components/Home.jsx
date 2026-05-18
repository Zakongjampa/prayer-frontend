import usePrayer from "../hooks/usePrayers";
import List from "./List";
import { Link } from "react-router-dom";
import useLiked from "../hooks/useLiked";

export default function Home() {
  const { prayers, loading: prayersLoading, error: prayersError } = usePrayer();
  const { likedPrayers, loading: likedLoading, error: likedError } = useLiked();

  const likedPrayerList = prayers.filter((prayer) => {
    let id = prayer.number;
    if (likedPrayers.includes(id)) return prayer;
  });

  const isLoggedIn = localStorage.getItem("username") != null;
  const name = isLoggedIn
    ? `${localStorage.getItem("firstname")?.toUpperCase() || ""} ${localStorage.getItem("lastname")?.toUpperCase() || ""}`.trim()
    : "";

  if (prayersLoading || likedLoading) {
    return <div>Loading...</div>;
  }

  if (prayersError || likedError) {
    return <div>Error: {prayersError || likedError}</div>;
  }

  return (
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
        <h1>དགའ་རྟགས་ཡོད་པས་ཞལ་འདོན་ཁག།</h1>
        <hr />
        {isLoggedIn ? (
          <>
            <h3>Welcome {name}</h3>
          </>
        ) : (
          <button className="btn btn-primary">
            <Link to="/login">Login</Link>
          </button>
        )}

        <List values={likedPrayerList} />

        <br />
        <br />
        <h1>ཞལ་འདོན་ཁག།</h1>
        <hr />
        <List values={prayers} />

        <button className="btn btn-primary">Welcome</button>
      </div>
    </div>
  );
}
