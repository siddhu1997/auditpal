const PaginatedTableModal = ({ onClose, isLoading, data, error, title, Table }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-[550px] h-[500px]">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                {isLoading ? (
                    <p className="text-gray-600">Loading...</p>
                ) : error ? (
                    <p className="text-red-600">{error}</p>
                ) : (
                    <div className="h-[80%]"><Table data={data} /></div>
                )}
                <button
                    className="text-black border-2 border-black font-bold py-2 px-4 rounded hover:bg-gray-600 hover:text-white"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PaginatedTableModal;