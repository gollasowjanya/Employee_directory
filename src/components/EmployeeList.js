import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Pagination } from '../common/Pagination';
import Modal from '../common/Modal';
import { EditEmployee } from './EditEmployee';

export const EmployeeList = () => {
  const { employees, removeEmployee, currentPage, employeesPerPage, setCurrentPage, filters, sortBy, searchTerm } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const openModal = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEmployeeId(null);
    setIsModalOpen(false);
  };

  const compareFunction = (a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "department":
        return a.department.localeCompare(b.department);
      case "yearsOfExperience":
        return a.yearsOfExperience - b.yearsOfExperience;
      case "location":
        return a.location.localeCompare(b.location);
      default:
        return 0;
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesFilters = (
      (filters.department === '' || employee.department === filters.department) &&
      (filters.location === '' || employee.location === filters.location) &&
      (filters.availability === '' || employee.availability === filters.availability) &&
      (filters.tags.length === 0 || filters.tags.some(tag => employee.tags.includes(tag)))
    );

    const matchesExperience = (
      filters.minExperience === '' || employee.yearsOfExperience >= filters.minExperience
    ) && (
      filters.maxExperience === '' || employee.yearsOfExperience <= filters.maxExperience
    );

    const matchesSearch = (
      searchTerm === '' || employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchesFilters && matchesExperience && matchesSearch;
  }).sort(compareFunction);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  return (
    <React.Fragment>
      {currentEmployees.length > 0 ? (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentEmployees.map((employee) => (
              <div key={employee.id} data-testid="employee" className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <div className="flex items-center p-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-300 text-gray-800 font-bold text-xl">
                    {employee.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-xl">{employee.name}</div>
                    <p className="bg-gray-200 p-1 rounded text-[#548BF4]">{employee.department}</p>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <p className="text-gray-700 text-base mb-2"><span style={{ fontWeight: '500' }}>Years of Experience:</span> {employee.yearsOfExperience}</p>
                  <p className="text-gray-700 text-base mb-2"><span style={{ fontWeight: '500' }}>Location:</span> {employee.location}</p>
                  <p className="text-gray-700 text-base mb-2">
                    <span style={{ fontWeight: '500' }}>Availability:</span> <span className={`px-2 py-1 rounded ${
                      employee.availability === 'Full-time' ? 'bg-green-200' : 'bg-red-200'
                    }`}>{employee.availability}</span>
                  </p>
                  <p className="text-gray-700 text-base mb-2"><span style={{ fontWeight: '500' }}>Tags:</span> {employee.tags.join(', ')}</p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => openModal(employee.id)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeEmployee(employee.id)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center ml-2"
                      title="Remove Employee"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center bg-gray-100 text-gray-500 py-5">No data.</p>
      )}

      <Pagination
        employeesPerPage={employeesPerPage}
        totalEmployees={filteredEmployees.length}
        paginate={setCurrentPage}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedEmployeeId && (
          <EditEmployee
            employeeId={selectedEmployeeId}
            onClose={closeModal}
          />
        )}
      </Modal>
    </React.Fragment>
  );
};
