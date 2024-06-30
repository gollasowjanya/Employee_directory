import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Range, getTrackBackground } from 'react-range';
import { IoFilterSharp } from "react-icons/io5";
import '../App.css';

export const EmployeeFilter = () => {
  const { filters, setFilters, employees, setSortBy, setSearchTerm, searchTerm } = useContext(GlobalContext);
  const [rangeValues, setRangeValues] = useState([filters.minExperience || 0, filters.maxExperience || 20]);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleTagChange = (tag) => {
    const updatedTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    setFilters({ ...filters, tags: updatedTags });
  };

  const handleDepartmentChange = (department) => {
    setFilters({ ...filters, department });
  };

  const handleExperienceChange = (experience) => {
    setFilters({ ...filters, minExperience: experience[0], maxExperience: experience[1] });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearFilters = () => {
    setFilters({
      department: '',
      location: '',
      availability: '',
      tags: [],
      minExperience: '',
      maxExperience: ''
    });
    setSearchTerm('');
    setRangeValues([0, 20]);
    setShowFiltersModal(false);
  };

  const handleRangeChange = (values) => {
    setRangeValues(values);
    setFilters({ ...filters, minExperience: values[0], maxExperience: values[1] });
  };

  const uniqueTags = [...new Set(employees.flatMap(employee => employee.tags))];
  const uniqueDepartments = [...new Set(employees.map(employee => employee.department))];

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4" style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <div className="flex w-full md:w-auto">
          
          <div className="relative flex items-center w-full md:w-auto text-center">
          <div className=" inset-y-0  flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="absolute left-1 text-gray-500 p-2" />
            </div>
           
            <input
              type="text"
              placeholder="Employee Name"
              id="search"
              className="common-input w-full text-center"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            
          </div>
        </div>

        <div className="flex w-full md:w-auto">
          <label htmlFor="sort" className="mr-2 m-auto">Sort by:</label>
          <select
            id="sort"
            className="common-input"
            onChange={handleSortChange}
            value={filters.sortBy}
          >
            <option value="">Select...</option>
            <option value="name">Name</option>
            <option value="department">Department</option>
            <option value="yearsOfExperience">Years of Experience</option>
            <option value="location">Location</option>
          </select>
        </div>

        <div className="flex w-full md:w-auto">
          <button
            onClick={() => setShowFiltersModal(true)}
            className=" hover:bg-gray-400 text-gray-800 font-semibold py-1 px-4 rounded flex items-center" style={{border:'2px solid #c9c4c4'}}
          >
            <IoFilterSharp style={{padding:'5px',fontSize:'30px'}}/>
            Filters
          </button>
        </div>
      </div>

      {showFiltersModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative">
            <button
              onClick={() => setShowFiltersModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="flex">
              <div className="w-1/2 pr-4 border-r border-gray-300">
                <button
                  onClick={() => setSelectedFilter('department')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Department
                </button>
                <button
                  onClick={() => setSelectedFilter('experience')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Years of Experience
                </button>
                <button
                  onClick={() => setSelectedFilter('tags')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Tags
                </button>
              </div>

              <div className="w-1/2 pl-4">
                {selectedFilter === 'department' && (
                  <div>
                    {uniqueDepartments.map(department => (
                      <div key={department} className="flex items-center">
                        <input
                          type="checkbox"
                          id={department}
                          checked={filters.department === department}
                          onChange={() => handleDepartmentChange(department)}
                          className="mr-2"
                        />
                        <label htmlFor={department}>{department}</label>
                      </div>
                    ))}
                  </div>
                )}

                {selectedFilter === 'experience' && (
                  <div>
                    <Range
                      values={rangeValues}
                      step={1}
                      min={0}
                      max={20}
                      onChange={handleRangeChange}
                      renderTrack={({ props, children }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: '3px',
                            width: '100%',
                            background: getTrackBackground({
                              values: rangeValues,
                              colors: ['#ccc', '#548BF4', '#ccc'],
                              min: 0,
                              max: 20
                            }),
                            borderRadius: '3px'
                          }}
                        >
                          {children}
                        </div>
                      )}
                      renderThumb={({ props }) => (
                        <div
                          {...props}
                          style={{
                            ...props.style,
                            height: '13px',
                            width: '13px',
                            backgroundColor: '#548BF4',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        />
                      )}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 w-full">
                      <span>{rangeValues[0]}</span>
                      <span>{rangeValues[1]}</span>
                    </div>
                  </div>
                )}

                {selectedFilter === 'tags' && (
                  <div>
                    {uniqueTags.map(tag => (
                      <div key={tag} className="flex items-center">
                        <input
                          type="checkbox"
                          id={tag}
                          checked={filters.tags.includes(tag)}
                          onChange={() => handleTagChange(tag)}
                          className="mr-2"
                        />
                        <label htmlFor={tag}>{tag}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleClearFilters}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
