const { useState } = require("react");

const ContractRolesTable = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Calculate the indices for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const tableKeyMap = {
        CONTRACTOR_TYPE: "Contractor Type",
        DAY_RATE: "Day Rate (USD)",
        EXPERIENCE_LEVEL: "Experience Level",
        OVERTIME_RATE: "Overtime Rate (per hour)",
    }
    return (
        <div>
            <table className="border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="text-left px-4 py-2">Contractor Type</th>
                        <th className="text-left px-4 py-2">Day Rate (USD)</th>
                        <th className="text-left px-4 py-2">Experience Level</th>
                        <th className="text-left px-4 py-2">Overtime Rate (per hour)</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => {
                        return (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                                <td className="px-4 py-2">{item[tableKeyMap.CONTRACTOR_TYPE]}</td>
                                <td className="px-4 py-2">{item[tableKeyMap.DAY_RATE]}</td>
                                <td className="px-4 py-2">{item[tableKeyMap.EXPERIENCE_LEVEL]}</td>
                                <td className="px-4 py-2">{item[tableKeyMap.OVERTIME_RATE]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                        className={`px-4 py-2 rounded-md border border-gray-300 ${currentPage === index + 1
                            ? 'bg-gray-950 500 text-white cursor-not-allowed'
                            : 'bg-white text-gray-950 hover:bg-gray-100'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};
export default ContractRolesTable;