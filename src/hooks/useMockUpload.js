import { useCallback } from "react";

const useMockUpload = () => {
  const mockUpload = useCallback(async (file, onProgress, onComplete) => {
    const delay = 100; // delay in ms
    const totalSteps = 10; // total steps for progress

    for (let i = 1; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      onProgress((i / totalSteps) * 100);
    }

    // Simulate saving to public/assets
      console.log(`File ${file.name} uploaded to public/assets.`);
      onComplete?.();
  }, []);

  return { mockUpload };
};

export default useMockUpload;
