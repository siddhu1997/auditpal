import { useEffect, useState, useCallback } from "react";

const useSummaryData = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSummaryData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/mockData/summary.json");
      if (!response.ok) {
        throw new Error("Failed to fetch summary.");
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
    fetchSummaryData();
  }, [fetchSummaryData]);

  return [data, error, isLoading];
};

export default useSummaryData;
