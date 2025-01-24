import React, { useEffect, useState } from "react";
import { useFileUpload } from "../hooks";
import useInvoiceProcessing from "../hooks/useInvoiceProcessing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SubmitInvoice = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [uploadFile, uploadError] = useFileUpload("invoices");
  const { processingStep, invoiceProcessed, startProcessing } =
    useInvoiceProcessing();

  const navigate = useNavigate();

  const handleFileUpload = async (files) => {
    if (files && files.length > 0) {
      setIsUploading(true);

      for (const file of files) {
        const progressCallback = (percent) => setProgress(percent);
        await uploadFile(file, progressCallback, startProcessing);
      }

      setIsUploading(false);
      setProgress(0);
    }
  };

  useEffect(() => {
    if (invoiceProcessed) {
      setTimeout(() => {
        navigate("/"); // Redirect to invoices page after processing
      }, 5000);
    }
  }, [invoiceProcessed]);

  const renderDropZone = () => (
    <div
      className="border-dashed border-2 border-gray-300 rounded-md p-6 flex flex-col justify-center items-center"
      style={{
        width: "500px",
        height: "200px",
        margin: "auto",
      }}
    >
      <h2 className="text-lg font-semibold">Upload Invoice</h2>
      <p className="text-gray-500 mb-4 text-sm">
        Drag and drop or choose an invoice to upload
      </p>
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
      >
        Choose File
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        multiple
        onChange={(e) => handleFileUpload(e.target.files)}
      />
      {isUploading && (
        <div className="mt-4 text-gray-700 text-sm">
          Uploading... {progress}% completed
        </div>
      )}
    </div>
  );

  const renderProcessingStepper = () => {
    const steps = [
      { label: "Uploading Invoice", status: "Completed" },
      { label: "Extracting Data", status: "In Progress" },
      { label: "Validating Invoice", status: "Pending" },
      { label: "Applying AI Analysis", status: "Pending" },
      { label: "Finalising Invoice", status: "Pending" },
    ];

    return (
      <div className="w-full flex flex-col items-center mt-10">
        <h1 className="text-2xl font-bold mb-4">
          Your invoice is being processed:
        </h1>
        <div className="flex justify-between items-center w-full max-w-4xl relative border-2 m-4 p-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-1/4 relative"
            >
              {/* Step Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  processingStep > index
                    ? "bg-green-500 text-white"
                    : processingStep === index
                    ? "border-4 border-blue-500 text-blue-500 bg-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {processingStep > index ? (
                  <FontAwesomeIcon icon={faCheckCircle} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {/* Step Line */}
              {index < steps.length && (
                <div
                  className={`w-full transition ease-linear h-1 ${
                    processingStep > index ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}

              {/* Step Label */}
              <div className="text-center mt-2">
                <p className="text-sm font-bold">{step.label}</p>
                <p
                  className={`text-xs ${
                    processingStep > index
                      ? "text-green-500"
                      : processingStep === index
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {processingStep > index
                    ? "Completed"
                    : processingStep === index
                    ? "In Progress"
                    : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>
        {invoiceProcessed && (
          <div className="mt-8 flex items-center text-green-500">
            <FontAwesomeIcon icon={faCheckCircle} className="text-4xl mr-4" />
            <h3 className="text-2xl font-bold">
              Your invoice has been processed
            </h3>
          </div>
        )}
      </div>
    );
  };

  if(uploadError) {
    return <div className="p-8">Error: {uploadError}</div>;
  }

  return (
    <div className="p-8">
      {!processingStep > 0 && <h1 className="text-2xl font-bold mb-4">Submit Invoice</h1>}
      <div className="flex flex-col items-center space-y-10">
        {!processingStep > 0 && renderDropZone()}
        <br />
        {processingStep > 0 && renderProcessingStepper()}
      </div>
    </div>
  );
};

export default SubmitInvoice;
