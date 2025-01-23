import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartBar,
  faCog,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <aside className="bg-gray-700 text-white h-screen transition-all duration-300 flex flex-col w-64 relative">
      {/* Top Section */}
      <div className={"flex items-center justify-center p-4"}>
        <span className="text-xl font-bold">Dashboard</span>
      </div>

      {/* Navigation Items */}
      <ul className="mt-4 flex-1">
        <li
          className={
            "hover:bg-gray-600 rounded-full p-2 flex items-center pl-4"
          }
        >
          <Link to="/" className="flex items-center">
            <FontAwesomeIcon icon={faHome} className="text-lg" />
            <span className="ml-4">Home</span>
          </Link>
        </li>
        <li
          className={
            "hover:bg-gray-600 rounded-full p-2 flex items-center pl-4"
          }
        >
          <Link to="/analytics" className="flex items-center">
            <FontAwesomeIcon icon={faChartBar} className="text-lg" />
            <span className="ml-4">Analytics</span>
          </Link>
        </li>
        <li
          className={
            "hover:bg-gray-600 rounded-full p-2 flex items-center pl-4"
          }
        >
          <Link to="/contracts" className="flex items-center">
            <FontAwesomeIcon icon={faFileContract} className="text-lg" />
            <span className="ml-4">Contracts</span>
          </Link>
        </li>
        <li
          className={
            "hover:bg-gray-600 rounded-full p-2 flex items-center pl-4"
          }
        >
          <Link to="/settings" className="flex items-center">
            <FontAwesomeIcon icon={faCog} className="text-lg" />
            <span className="ml-4">Settings</span>
          </Link>
        </li>
      </ul>

      {/* Fixed Bottom Section */}
      <div className="absolute bottom-0 w-full flex justify-center p-4">
        <Link
          to="/submit-invoice"
          className="bg-white text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-200 text-center w-full"
        >
          Submit an Invoice
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
