import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { API_URL_USERS } from "../../ApiUrls";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL_USERS);
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch users");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}
