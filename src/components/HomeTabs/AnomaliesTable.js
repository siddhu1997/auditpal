import { useState } from 'react';

const AnomaliesTable = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

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

    return (
        <div>
            <table className="border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="text-left px-4 py-2">Anomaly</th>
                        <th className="text-left px-4 py-2">Contractor Name</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                            <td className="px-4 py-2">{item.anomaly}</td>
                            <td className="px-4 py-2">{item.contractor_name}</td>
                        </tr>
                    ))}
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

export default AnomaliesTable;