import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLink } from "@fortawesome/free-solid-svg-icons";

import PaginatedTableModal from "../Modals/PaginatedTableModal";
import { useHistoryData, useGetAnomalyData } from "../../hooks";
import AnomaliesTable from "./AnomaliesTable";

const HistoryTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, error, isLoading] = useHistoryData();
  const [anomalyData, anomalyError, anomalyIsLoading, setInvoiceId] = useGetAnomalyData();

  if (isLoading) {
    return (
      <div className="p-6 rounded">
        <h2 className="text-lg font-bold">History</h2>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded">
        <h2 className="text-lg font-bold">History</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const calculateTotalAmount = (data) => {
    if (!data) return 0;
    return data.reduce((acc, item) => {
      const rate = parseInt(item['RATE']?.replace('$', ''));
      acc += isNaN(rate) ? 0 : rate;
      return acc;
    }, 0);
  };

  const handleExternalLinkOnClick = (invoiceId) => {
    setIsModalOpen(true);
    setInvoiceId(invoiceId);
  }

  return (
    <div className="p-6 rounded">
      <h2 className="text-lg font-bold pb-4">History of invoices submitted so far</h2>
      {data?.length > 0 ? (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Invoice Id</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.invoice_id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.invoice_id}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.date ?? new Date().toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.status ?? "PENDING"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {calculateTotalAmount(item?.data)}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button onClick={() => handleExternalLinkOnClick(item.invoice_id)}><FontAwesomeIcon icon={faExternalLink} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No data available at the moment.</p>
      )}
      {isModalOpen && (
        <PaginatedTableModal
          onClose={() => setIsModalOpen(false)}
          isLoading={anomalyIsLoading}
          data={anomalyData}
          error={anomalyError}
          Table={AnomaliesTable}
          title="Anomalies"
        />)
      }
    </div>
  );
};

export default HistoryTab;
