import { Tooltip } from "@mui/material";
import { useSummaryData } from "../../hooks";

const SummaryTab = () => {
  const [data, error, isLoading] = useSummaryData();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="mr-10 pr-6">
      {/* Second Section (Top 5 Contractor Roles) */}
      <div className="p-6 rounded">
        <h2 className="text-lg font-bold mb-4">Amount sanctioned</h2>
        <div className="bg-gray-200 p-6 rounded mb-4">
          {data?.sanctioned && (
            <>
              <div className="flex items-center">
                <p className="text-2xl font-bold mb-1">
                  {data?.sanctioned?.total ?? "N/A"}
                </p>
                <p className="text-xs">&nbsp;&nbsp;&nbsp;- amount approved so far</p>
              </div>
              <div className="flex items-center">
                <p className="text-4xl font-bold mb-1">
                  {data?.sanctioned?.noOfTransactions ?? "N/A"}
                </p>
                <p className="text-xs">&nbsp;&nbsp;&nbsp;- no. of invoices processed so far</p>
              </div>
              <div className="flex items-center">
                <p
                  className={`${data?.sanctioned?.percentageDifference > 0
                    ? "text-green-500"
                    : "text-red-700"
                    } font-bold text-xs`}
                >
                  {data?.sanctioned?.percentageDifference?.toFixed(2) ?? "N/A"}%
                </p>
                <p className="text-xs">&nbsp;&nbsp;&nbsp;- percentage difference from last month</p>
              </div>
            </>
          )}
        </div>
        {data?.sanctioned?.breakdown && (
          <div className="flex space-x-2">
            {Object.keys(data?.sanctioned?.breakdown).map((timePeriod) => {
              return (
                <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
                  {`$${data.sanctioned.breakdown[timePeriod].toFixed(2)} this ${timePeriod}`}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Second Section (Top 5 Contractor Roles) */}
      {data?.topRoles && (
        <div className="p-6 rounded">
          <h2 className="text-lg font-bold mb-4">Top 5 Contractor Roles</h2>
          {data?.topRoles.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-left px-4 py-2">Role</th>
                  <th className="text-left px-4 py-2">Total Amount ($)</th>
                </tr>
              </thead>
              <tbody>
                {data.topRoles.map(([contractorName, contractorAmount], index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <td className="px-4 py-2">{contractorName}</td>
                    <td className="px-4 py-2">{contractorAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No data available at the moment.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SummaryTab;
