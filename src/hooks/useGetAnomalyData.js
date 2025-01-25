import { useEffect, useState, useCallback } from "react";
import { BASE_URL } from "../utils/constants";

const useGetAnomalyData = () => {
    const [error, setError] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [invoiceId, setInvoiceId] = useState(null);

    const getAnomalies = useCallback(async () => {
        setIsLoading(true);
        try {
            if(!invoiceId) {
                setIsLoading(false);
                return;
            }
            const url = `${BASE_URL}/getAnamolies/${invoiceId}`;
            const response = await fetch(url);
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
    }, [setData, setIsLoading, setError, invoiceId]);

    useEffect(() => {
        if(invoiceId) {
            getAnomalies();
        }
    }, [getAnomalies, invoiceId]);

    return [data, error, isLoading, setInvoiceId];
};

export default useGetAnomalyData;
