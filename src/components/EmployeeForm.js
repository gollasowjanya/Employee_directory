import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Modal from '../common/Modal';

export const AddEmployee = ({ isOpen, onClose }) => {
  const { addEmployee, employees } = useContext(GlobalContext);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("Part-time");
  const [tags, setTags] = useState([""]);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setDepartment("");
      setYearsOfExperience("");
      setLocation("");
      setAvailability("Part-time");
      setTags([""]);
    }
  }, [isOpen]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: employees.length + 1,
      name,
      department,
      yearsOfExperience: parseInt(yearsOfExperience),
      location,
      availability,
      tags: tags.filter(tag => tag.trim() !== "")
    };
    addEmployee(newEmployee);
    onClose();
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const addTag = () => {
    setTags([...tags, ""]);
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-lg container mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full mb-5">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
              Name of Employee
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </div>
          <div className="w-full mb-5">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="department">
              Department
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              type="text"
              placeholder="Enter department"
            />
          </div>
          <div className="w-full mb-5">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="yearsOfExperience">
              Years of Experience
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              type="number"
              placeholder="Enter years of experience"
            />
          </div>
          <div className="w-full mb-5">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
              Location
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              placeholder="Enter location"
            />
          </div>
          <div className="w-full mb-5">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="availability">
              Availability
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
            </select>
          </div>
          <div className="w-full mb-5">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tags">
              Tags
            </label>
            {tags.map((tag, index) => (
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
            <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Employee
            </button>
          </div>
          <div className="text-center mt-4 text-gray-500">
            <button type="button" onClick={onClose} className="text-blue-500 hover:text-blue-700">Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
