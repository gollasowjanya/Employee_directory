import React, { useContext } from "react";
import { Heading } from "./Heading";
import { EmployeeList } from "./EmployeeList";
import { GlobalContext } from '../context/GlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
export const Home = () => {
  const { setSortBy, setSearchTerm } = useContext(GlobalContext);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="container mx-auto">
        <Heading />
        <div className="flex items-center text-left px-4 py-2 m-2">
          
          <label htmlFor="sort" className="mr-2 font-semibold">
            Sort by:
          </label>
          <select
            id="sort"
            className="px-2 py-1 border rounded"
            onChange={handleSortChange}
          >
            <option value="">Select...</option>
            <option value="name">Name</option>
            <option value="department">Department</option>
            <option value="yearsOfExperience">Years of Experience</option>
            <option value="location">Location</option>
          </select>
         <div className="relative">
          <input
            type="text"
            placeholder="Employee Name"
            className="px-2 py-1 m-2 border rounded mr-2"
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 right-3 flex items-center  pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
            </div>
          </div>

        </div>
        <EmployeeList />
      </div>
    </React.Fragment>
  );
};