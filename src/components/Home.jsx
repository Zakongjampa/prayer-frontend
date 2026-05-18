import { useEffect } from "react";
import List from "./List";
import { Link } from "react-router-dom";

export default function Home({ prayers, likedPrayers, userId, topLiked }) {
  let LikedPrayersContent = prayers.filter((prayer) =>
    likedPrayers.includes(prayer.number),
  );
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
        {userId != null ? (
          <>
            <h3> བྱོན་པ་ལེགས། </h3>
          </>
        ) : (
          <button className="btn btn-primary">
            <Link to="/login">Login</Link>
          </button>
        )}

        <List values={LikedPrayersContent} />

        <br />
        <br />
        <h1>ཞལ་འདོན་ཁག།</h1>
        <hr />
        <List values={prayers} />

        <h1>ཆེས་དགའ་ཤོས་བྱེད་པས་ཞལ་འདོན་ཁག་གཅིག།</h1>
        <hr />
        <List values={topLiked} />
      </div>
    </div>
  );
}
