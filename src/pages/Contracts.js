import React, { useState, useEffect } from "react";
import { useFileUpload, useGetContracts, useDeleteFile } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import PaginatedTableModal from "../components/Modals/PaginatedTableModal";
import { ContractRolesTable } from "../components/HomeTabs";

const Contracts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [contractIdToBeDeleted, setContractIdToBeDeleted] = useState(null);

  const [uploadFile, uploadError] = useFileUpload("contracts");
  const [deleteFile, isDeleting, deleteError] = useDeleteFile("contracts");
  const [data, setData, isLoading, error] = useGetContracts([isUploading, isDeleting]);

  // Update data with fetched contracts
  useEffect(() => {
    if (contractIdToBeDeleted) {
      deleteFile("contract", contractIdToBeDeleted);
      setData(null);
      setContractIdToBeDeleted(null);
    }
  }, [contractIdToBeDeleted]);

  const handleFileUpload = async (files) => {
    if (files && files.length > 0) {
      setIsUploading(true);

      for (const file of files) {
        const progressCallback = (percent) => setProgress(percent);
        await uploadFile(file, progressCallback);
      }

      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleDelete = (contractId) => {
    setContractIdToBeDeleted(contractId);
  };

  const handleOnClick = () => {
    setIsModalOpen(true);
  }

  const renderDropZone = () => (
    <div
      className="border-dashed border-2 border-gray-300 rounded-md p-6 flex flex-col justify-center items-center"
      style={{
        width: "700px", // More elongated drop zone
        height: data?.length === 0 ? "400px" : "250px", // Proportionally larger height
        margin: data?.length === 0 ? "auto" : "0",
      }}
    >
      <h2 className="text-lg font-semibold">Upload Contracts</h2>
      <p className="text-gray-500 mb-4 text-sm">
        Drag and drop or choose files to upload
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

  const renderUploadedContracts = () => {
    if (isLoading || isDeleting) {
      return <p className="text-gray-500">Loading contracts...</p>;
    }

    if (error || uploadError || deleteError) {
      return (
        <p className="text-red-500">
          Error: {error || uploadError || deleteError}. Please try again.
        </p>
      );
    }

    if (data?.length === 0) {
      return <p className="text-gray-500">No contracts uploaded yet.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((doc) => (
          <div
            key={doc.contract_id}
            className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative"
          >
            <div className="p-4 flex flex-col">
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {doc.contract_name}
              </a>
              <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 text-sm">
                Click "Read More" to view or download this contract.
              </p>
              <div className="flex justify-between align-bottom items-center">
                <div>
                  <button onClick={handleOnClick} className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                    View Rates
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <button
                    onClick={() => handleDelete(doc.contract_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center h-screen space-y-10 p-8">
      {/* Drop Zone */}
      <div>{renderDropZone()}</div>

      {/* Uploaded Contracts */}
      {data?.length > 0 && (
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-4 mt-16">
            Your Existing Contracts
          </h2>
          {renderUploadedContracts()}
        </div>
      )}
      {isModalOpen && <PaginatedTableModal onClose={() => setIsModalOpen(false)} title="Contracter Roles" data={data.map(item => item.data.slice(0, 10))?.[0]} Table={ContractRolesTable} />}
    </div>
  );
};

export default Contracts;
