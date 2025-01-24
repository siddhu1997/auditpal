import { useState, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const useDeleteFile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let url = BASE_URL;
    const deleteFile = useCallback(async (commodity, id) => {
        setLoading(true);
        setError(null);
        if (commodity === "contract") {
            url += `/contracts/${id}`;
        } else if (commodity === "invoice") {
            url += `/invoice/${id}`;
        } else {
            setLoading(false);
            return;
        }
        try {
            await axios.delete(url);
        } catch (err) {
            setLoading(false);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return [deleteFile, loading, error];
};

export default useDeleteFile;