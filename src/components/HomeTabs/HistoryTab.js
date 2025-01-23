import { useHistoryData } from "../../hooks";

const HistoryTab = () => {
  const [data, error, isLoading] = useHistoryData();
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

  return (
    <div className="p-6 rounded">
      <h2 className="text-lg font-bold pb-4">History of invoices submitted so far</h2>
      {data?.length ? (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.id}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.date}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.status}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No data available at the moment.</p>
      )}
    </div>
  );
};

export default HistoryTab;
