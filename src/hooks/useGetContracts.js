import { useEffect, useState, useCallback } from "react";

const useGetContracts = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getContracts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/mockData/contracts.json");
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
    getContracts();
  }, [getContracts]);

  return [data, error, isLoading];
};

export default useGetContracts;
