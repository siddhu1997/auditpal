import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { useGetSettings, useUpdateSettings } from "../hooks";

const Settings = () => {
  // Modal state 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // States for editable fields 
  const [orgName, setOrgName] = useState("");
  const [admin, setAdmin] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [isOrgNameEditable, setIsOrgNameEditable] = useState(false);
  const [isAdminNameEditable, setIsAdminNameEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [isMonthlyBudgetEditable, setIsMonthlyBudgetEditable] = useState(false);

  const [settingsGetData, isSettingsLoadings, settingsError] = useGetSettings();
  const [_, isSettingsUpdating, settingsUpdateError, setStartUpdate] = useUpdateSettings({ orgName, admin, email, monthlyBudget, users });

  useEffect(() => {
    if (Object.keys(settingsGetData).length) {
      setOrgName(settingsGetData.organizationName);
      setAdmin(settingsGetData.adminName);
      setEmail(settingsGetData.adminEmail);
      setUsers(settingsGetData.users);
      setMonthlyBudget(settingsGetData.monthlyBudget)
    }
  }, [settingsGetData]);

  const handleKeyDownCapture = useCallback((event, setReactState, reactState) => {
    if (event.key === 'Enter') {
      setReactState(!reactState);
      setStartUpdate(true);
    }
  }, []);

  if (isSettingsLoadings || isSettingsUpdating) {
    return <div className="p-6min-h-screen">Loading...</div>;
  }

  if (settingsError || settingsUpdateError) {
    return <div className="p-6 min-h-screen">An error occurred: {settingsError}</div>;
  }

  // Add new team member 
  const handleAddTeamMember = (name, email) => {
    setUsers([...users, { name, email }]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      {/* Editable Fields */}
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Organization Name</label>
          <div className="flex items-center">
            {isOrgNameEditable ? (
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                onKeyDownCapture={(e) => handleKeyDownCapture(e, setIsOrgNameEditable, isOrgNameEditable)}
                className="border rounded p-2 max-w-md min-w-md"
              />
            ) :
              (<p className="text-gray-700">{orgName}</p>)
            }
            <button
              className="ml-4 text-blue-500"
              onClick={() => setIsOrgNameEditable(!isOrgNameEditable)}
            >
              <FontAwesomeIcon icon={isOrgNameEditable ? faSave : faEdit} />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Admin Name</label>
          <div className="flex items-center">
            {isAdminNameEditable ?
              (
                <input
                  type="text"
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value)}
                  onKeyDownCapture={(e) => handleKeyDownCapture(e, setIsAdminNameEditable, isAdminNameEditable)}
                  className="border rounded p-2 max-w-md min-w-md"
                />
              ) : (
                <p className="text-gray-700">{admin}</p>)
            }
            <button
              className="ml-4 text-blue-500"
              onClick={() => setIsAdminNameEditable(!isAdminNameEditable)}
            >
              <FontAwesomeIcon icon={isAdminNameEditable ? faSave : faEdit} />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Admin Email</label>
          <div className="flex items-center">
            {isEmailEditable ?
              (
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDownCapture={(e) => handleKeyDownCapture(e, setIsEmailEditable, isEmailEditable)}
                  className="border rounded p-2 max-w-md min-w-md"
                />
              ) : (
                <p className="text-gray-700">{email}</p>
              )
            }
            <button
              className="ml-4 text-blue-500"
              onClick={() => setIsEmailEditable(!isEmailEditable)}
            >
              <FontAwesomeIcon icon={isEmailEditable ? faSave : faEdit} />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Monthly Budget</label>
          <div className="flex items-center">
            {isMonthlyBudgetEditable ? (
              <input
                type="text"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                onKeyDownCapture={(e) => handleKeyDownCapture(e, setIsMonthlyBudgetEditable, isMonthlyBudgetEditable)}
                className="border rounded p-2 max-w-md min-w-md"
              />
            ) :
              (<p className="text-gray-700">{`$${monthlyBudget}`}</p>)
            }
            <button
              className="ml-4 text-blue-500"
              onClick={() => setIsMonthlyBudgetEditable(!isMonthlyBudgetEditable)}
            >
              <FontAwesomeIcon icon={isMonthlyBudgetEditable ? faSave : faEdit} />
            </button>
          </div>
        </div>
      </div>
      {/* Users Table */}
      <div className="bg-white rounded mb-6">
        <h2 className="text-lg font-bold mb-4">Team Members</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add New Team Member */}
      <button
        className="text-black border-2 border-black font-bold py-2 px-4 rounded hover:bg-gray-600 hover:text-white"
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New Team Member
      </button>
      {/* Modal */}
      {isModalOpen && <AddTeamMemberModal onClose={() => setIsModalOpen(false)} onAdd={handleAddTeamMember} />}
    </div>
  );
};

const AddTeamMemberModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (name && email) {
      onAdd(name, email);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Add Team Member</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 w-full" />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            onClick={onClose}
          > Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          > Add </button>
        </div>
      </div>
    </div>
  );
};
export default Settings;