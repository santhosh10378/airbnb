import { useState, useCallback, useEffect } from "react";
import { axiosInstance } from "../config/axiosInstance";

const useFetch = (fetchURL, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(fetchURL, options);
      setData(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      console.error(`Fetch error for ${fetchURL}:`, err);
    } finally {
      setLoading(false);
    }
  }, [fetchURL, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchURL, JSON.stringify(options)]);

  return { data, loading, error, fetchData };
};

export default useFetch;
