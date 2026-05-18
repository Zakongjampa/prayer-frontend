import { Fragment, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Pecha from "./components/Pecha";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import axios from "axios";
import { API_URL_PRAYERS, API_URL_LIKES, API_URL_USERS } from "../ApiUrls";

function App() {
  const [prayers, setPrayers] = useState([]);
  const [userId, setUserId] = useState(
    () => localStorage.getItem("id") ?? null,
  );
  const [users, setUsers] = useState([]);
  const [likedPrayers, setLikedPrayers] = useState([]);
  const [topLikedPrayers, setTopLikedPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let fetchLikedPrayers = () => {
    if (userId == null) return;
    axios
      .get(API_URL_LIKES + "/" + userId)
      .then((response) => setLikedPrayers(response.data))
      .catch((err) => setError("An error occurs " + err));
  };

  let handleLikeButton = (prayerId) => {
    let url = API_URL_LIKES + "/" + userId + "/" + prayerId;
    if (!likedPrayers.includes(prayerId)) {
      console.log("Like");
      axios
        .post(url)
        .then(() => fetchLikedPrayers())
        .catch((err) => setError("Failed to like prayer " + err));
    } else {
      console.log("Dislike");
      axios
        .delete(url)
        .then(() => fetchLikedPrayers())
        .catch((err) => setError("Failed to dislike prayer" + err));
    }
  };
  // Getting the prayers
  useEffect(() => {
    axios
      .get(API_URL_PRAYERS)
      .then((response) => {
        setPrayers(response.data);
      })
      .catch((err) => setError("Failed to Load Prayers" + err))
      .finally(() => setLoading(false));
  }, []);

  // fetching the users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL_USERS);
        setUsers(response.data);
      } catch (err) {
        setError("Error fetching users " + err);
      }
    };
    fetchUsers();
  }, []);

  // fetching the likedprayers
  useEffect(() => {
    fetchLikedPrayers();
  }, [userId]);

  useEffect(() => {
    axios
      .get(API_URL_LIKES + "/top-liked")
      .then((response) => setTopLikedPrayers(response.data))
      .catch((err) => setError("An error occured " + err));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Fragment>
      <Nav userId={userId} setUserId={setUserId} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              prayers={prayers}
              likedPrayers={likedPrayers}
              userId={userId}
              topLiked={topLikedPrayers}
            />
          }
        />
        <Route
          path="/prayer/:id"
          element={
            <Pecha
              prayers={prayers}
              userId={userId}
              likedPrayers={likedPrayers}
              handleLikeButton={handleLikeButton}
            />
          }
        />
        <Route path="/login" element={<Login setUserId={setUserId} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="*"
          element={<h2 style={{ zIndex: "1" }}>Page Not Found</h2>}
        />
      </Routes>
    </Fragment>
  );
}

export default App;
