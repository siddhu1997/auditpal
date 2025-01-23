import { useState } from "react";
import { HistoryTab, SummaryTab } from "../components/HomeTabs";

const Home = () => {
  const [activeTab, setActiveTab] = useState("summary"); // Tab state

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full my-10">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 text-lg font-bold py-2 text-center ${
            activeTab === "summary"
              ? "border-b-2 border-black-500 text-black-500"
              : "text-gray-500"
          }`}
          onClick={() => handleTabClick("summary")}
        >
          Summary
        </button>
        <button
          className={`flex-1 py-2 text-lg font-bold text-center ${
            activeTab === "history"
              ? "border-b-2 border-black-500 text-black-500"
              : "text-gray-500"
          }`}
          onClick={() => handleTabClick("history")}
        >
          History
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "summary" && <SummaryTab />}
      {activeTab === "history" && <HistoryTab />}
    </div>
  );
};

export default Home;
