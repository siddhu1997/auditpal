import { useEffect, useState, useCallback } from "react";
import { BASE_URL } from "../utils/constants";

const useHistoryData = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistoryData = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = `${BASE_URL}/invoices`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch history data.");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setData, setIsLoading, setError]);

  useEffect(() => {
    fetchHistoryData();
  }, [fetchHistoryData]);

  return [data, error, isLoading];
};

export default useHistoryData;
