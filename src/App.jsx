import { Fragment, useCallback, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Prayers from "./pages/Prayers";
import ReadPecha from "./pages/ReadPecha";
import Books from "./pages/Books";
import ReadBook from "./pages/ReadBook";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import InsertPecha from "./pages/InsertPecha";
import {
  getLikedByCurrentUser,
  likePrayer,
  unlikePrayer,
} from "./services/likesService";

function App() {
  const { pathname } = useLocation();
  const [userId, setUserId] = useState(
    () => localStorage.getItem("id") ?? null,
  );
  const [likedPrayers, setLikedPrayers] = useState([]);
  const [error, setError] = useState(null);

  const updateUserId = useCallback((nextUserId) => {
    setUserId(nextUserId);
    if (nextUserId == null) {
      setLikedPrayers([]);
      setError(null);
    }
  }, []);

  const fetchLikedPrayers = useCallback(() => {
    return getLikedByCurrentUser()
      .then(setLikedPrayers)
      .catch((err) => {
        if (localStorage.getItem("id") == null) {
          setLikedPrayers([]);
          return;
        }
        setError("An error occurs " + err);
      });
  }, []);

  const handleLikeButton = async (prayerId) => {
    try {
      if (likedPrayers.includes(prayerId)) {
        await unlikePrayer(prayerId);
      } else {
        await likePrayer(prayerId);
      }
      await fetchLikedPrayers();
    } catch (err) {
      if (localStorage.getItem("id") == null) {
        setLikedPrayers([]);
        return;
      }
      setError("Failed to update prayer like " + err);
    }
  };

  useEffect(() => {
    if (userId != null) fetchLikedPrayers();
  }, [fetchLikedPrayers, userId]);

  useEffect(() => {
    const handleSessionExpired = () => updateUserId(null);
    window.addEventListener("auth:session-expired", handleSessionExpired);
    return () =>
      window.removeEventListener("auth:session-expired", handleSessionExpired);
  }, [updateUserId]);

  const isBookReader = /^\/books\/[^/]+$/.test(pathname);

  if (error) return <p>{error}</p>;

  return (
    <Fragment>
      {!isBookReader && <Nav userId={userId} setUserId={updateUserId} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prayers" element={<Prayers userId={userId} />} />
        <Route path="/books" element={<Books userId={userId} />} />
        <Route
          path="/books/:id"
          element={<ReadBook key={pathname} userId={userId} />}
        />
        <Route
          path="/prayer/:id"
          element={
            <ReadPecha
              userId={userId}
              likedPrayers={likedPrayers}
              handleLikeButton={handleLikeButton}
            />
          }
        />
        <Route path="/login" element={<Login setUserId={updateUserId} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="*"
          element={<h2 style={{ zIndex: "1" }}>Page Not Found</h2>}
        />
        <Route path="/insertPecha" element={<InsertPecha />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
