import { useEffect, useState, useCallback } from "react";
import { BASE_URL } from "../utils/constants";

const useSummaryData = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSummaryData = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = `${BASE_URL}/invoicesSummary`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch summary.");
      }
      const data = await response.json();
      console.log(data);
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
