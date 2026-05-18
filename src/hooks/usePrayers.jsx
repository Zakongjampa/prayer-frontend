import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL_PRAYERS } from "../../ApiUrls";

export default function usePrayer() {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL_PRAYERS);
        setPrayers(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch prayers");
        console.error("Error fetching prayers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayers();
  }, []);

  return { prayers, loading, error };
}
