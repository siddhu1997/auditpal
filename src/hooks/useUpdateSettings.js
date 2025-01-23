import { useEffect, useState, useCallback } from "react";

const useUpdateSettings = (dependencies) => {
    const [error, setError] = useState("");
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [startUpdate, setStartUpdate] = useState(false);

    const updateSettings = useCallback(async () => {
        setIsLoading(true);
        const body = Object.keys(dependencies).reduce((acc, dependency) => {
            if (dependencies[dependency]) {
                acc[dependency] = dependencies[dependency];
            }
            return acc;
        }, {});
        console.log(body);
        setIsLoading(false);
        // return await fetch("/api/update", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(body),
        // });
    }, [setData, setIsLoading, setError, dependencies]);

    useEffect(() => {
        if(startUpdate) {
            console.log("update trigerred!")
            updateSettings();
        }
        setStartUpdate(false);
    }, [startUpdate])
    
    return [data, isLoading, error, setStartUpdate];
};

export default useUpdateSettings;