import { useEffect, useState, useCallback } from "react";

const useAnalyticsData = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalyticsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/mockData/analytics.json");
      if (!response.ok) {
        throw new Error("Failed to fetch analytics data.");
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
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);
    
  return [data, error, isLoading];
};

export default useAnalyticsData;
