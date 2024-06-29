import React, { useState, useContext, useEffect } from 'react';
import {  Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import Modal from '../common/Modal';

export const EditEmployee = ({ employeeId, onClose }) => {
  const { employees, editEmployee } = useContext(GlobalContext);
  const [selectedUser, setSelectedUser] = useState({
    id: null,
    name: "",
    department: "",
    yearsOfExperience: "",
    location: "",
    availability: "Part-time",
    tags: [""]
  });

  useEffect(() => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      setSelectedUser(employee);
    }
  }, [employeeId, employees]);

  const handleOnChange = (key, value) => {
    setSelectedUser({ ...selectedUser, [key]: value });
  };

  const handleTagChange = (index, value) => {
    const newTags = [...selectedUser.tags];
    newTags[index] = value;
    setSelectedUser({ ...selectedUser, tags: newTags });
  };

  const addTag = () => {
    setSelectedUser({ ...selectedUser, tags: [...selectedUser.tags, ""] });
  };

  const removeTag = (index) => {
    const newTags = [...selectedUser.tags];
    newTags.splice(index, 1);
    setSelectedUser({ ...selectedUser, tags: newTags });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editEmployee(selectedUser);
    onClose();
  };

  if (!selectedUser || !selectedUser.id) {
    return <div>Invalid Employee ID.</div>;
  }

  return (
    <div className="w-full max-w-lg container  mx-auto">
      <form onSubmit={onSubmit}>
        <div className="w-full mb-5">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
            Name of Employee
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
            value={selectedUser.name}
            onChange={(e) => handleOnChange("name", e.target.value)}
            type="text"
            placeholder="Enter name"
          />
        </div>
        <div className="w-full mb-5">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="department">
            Department
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
            value={selectedUser.department}
            onChange={(e) => handleOnChange("department", e.target.value)}
            type="text"
            placeholder="Enter department"
          />
        </div>
        <div className="w-full mb-5">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="yearsOfExperience">
            Years of Experience
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
            value={selectedUser.yearsOfExperience}
            onChange={(e) => handleOnChange("yearsOfExperience", e.target.value)}
            type="number"
            placeholder="Enter years of experience"
          />
        </div>
        <div className="w-full mb-5">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
            value={selectedUser.location}
            onChange={(e) => handleOnChange("location", e.target.value)}
            type="text"
            placeholder="Enter location"
          />
        </div>
        <div className="w-full mb-5">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="availability">
            Availability
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
            value={selectedUser.availability}
            onChange={(e) => handleOnChange("availability", e.target.value)}
          >
            <option value="Part-time">Part-time</option>
            <option value="Full-time">Full-time</option>
          </select>
        </div>
        <div className="w-full mb-5">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tags">
            Tags
          </label>
          {selectedUser.tags.map((tag, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                type="text"
                placeholder="Enter tag"
              />
              <button
                type="button"
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => removeTag(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            onClick={addTag}
          >
            Add Tag
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Edit Employee
          </button>
        </div>
        <div className="text-center mt-4 text-gray-500">
            <button type="button" onClick={onClose} className="text-blue-500 hover:text-blue-700">Cancel</button>
          </div>
      </form>
    </div>
  );
};


