import { useState, useCallback } from "react";
import { io } from "socket.io-client";

const useInvoiceProcessing = () => {
  const [processingStep, setProcessingStep] = useState(0);
  const [invoiceProcessed, setInvoiceProcessed] = useState(false);

  const startProcessing = useCallback(() => {
    const socket = io("http://localhost:3002");
    console.log("Invoice processing started...");
    setProcessingStep(1);
    socket.on("connect", () => {
      socket.emit("invoiceUploaded");

      socket.on("invoiceProcessing", (step) => {
        setProcessingStep(step);
        if (step === 4) {
          setProcessingStep(5);
          setInvoiceProcessed(true);
          socket.disconnect();
        }
      });
    });
  }, [setProcessingStep]);

  return { processingStep, invoiceProcessed, startProcessing };
};

export default useInvoiceProcessing;
