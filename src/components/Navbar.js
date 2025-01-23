import React from "react";
import { Link } from "react-router";

const Navbar = () => (
  <nav className="bg-gray-800 text-white px-4 py-3 max-w-screen">
    <div className="flex justify-between items-center">
      <div className="text-xl font-bold">Auditpal</div>
      <div className="flex space-x-8 pr-4">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/help" className="hover:text-blue-400">
          Help
        </Link>
        <Link to="/submit-invoice" className="hover:text-blue-400">
          Submit an Invoice
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
