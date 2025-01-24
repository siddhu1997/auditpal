import { useCallback, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const useFileUpload = (commodity) => {
  const [error, setError] = useState(null);
  const uploadFile = useCallback(async (file, onProgress, onComplete) => {
    const formData = new FormData();
    formData.append('file', file);

    let url = BASE_URL;
    if (commodity === "contracts") {
      url += '/uploadcontract/' + file.name;
    } else if (commodity === "invoices") {
      url += '/invoices/' + file.name;
    } else {
      return;
    }

    try {
      await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(percentComplete);
        },
      });
      console.log(`File ${file.name} uploaded.`);
      onComplete?.();
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error.message);
    }
  }, []);

  return [uploadFile, error];
};

export default useFileUpload;