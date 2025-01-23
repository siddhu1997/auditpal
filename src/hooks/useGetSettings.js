import { useEffect, useState, useCallback } from "react";

const useHistoryData = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchHistoryData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/mockData/settings.json");
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
