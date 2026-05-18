import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL_LIKES } from "../../ApiUrls";

export default function useLiked() {
  const [likedPrayers, setLikedPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      setLoading(false);
      return;
    }

    const url = `${API_URL_LIKES}/${userId}`;
    const fetchLikedPrayers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setLikedPrayers(response.data || []);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch liked prayers");
        console.error("Error fetching liked prayers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedPrayers();
  }, []);
  return { likedPrayers, loading, error };
}
