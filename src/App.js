import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Analytics, Contracts, Home, Settings, SubmitInvoice } from "./pages";

const App = () => (
  <Router>
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/submit-invoice" element={<SubmitInvoice />} />
          </Routes>
        </div>
      </div>
    </div>
  </Router>
);

export default App;
