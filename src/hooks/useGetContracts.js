import { useEffect, useState, useCallback } from "react";
import { BASE_URL } from "../utils/constants";

const useGetContracts = (dependencies) => {
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getContracts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/getcontracts`);
      if (!response.ok) {
        throw new Error("Failed to fetch analytics data.");
      }
      const apiData = await response.json();
      setData(apiData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setData, setIsLoading, setError]);

  useEffect(() => {
      getContracts();
  }, [getContracts, ...dependencies]);

  return [data, setData, error, isLoading];
};

export default useGetContracts;
