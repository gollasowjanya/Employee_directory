import React, { createContext, useReducer, useEffect } from 'react';
import appReducer from './AppReducer';

const initialState = {
  employees: [
    {
      "id": 1,
      "name": "John Doe",
      "department": "Engineering",
      "yearsOfExperience": 5,
      "location": "New York",
      "availability": "Full-time",
      "tags": ["React", "Node.js"]
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "department": "Marketing",
      "yearsOfExperience": 3,
      "location": "San Francisco",
      "availability": "Part-time",
      "tags": ["SEO", "Content Marketing"]
    },
    {
      "id": 3,
      "name": "Michael Johnson",
      "department": "Finance",
      "yearsOfExperience": 7,
      "location": "Chicago",
      "availability": "Full-time",
      "tags": ["Accounting", "Budgeting"]
    },
    {
      "id": 4,
      "name": "Emily Davis",
      "department": "Human Resources",
      "yearsOfExperience": 4,
      "location": "Los Angeles",
      "availability": "Part-time",
      "tags": ["Recruiting", "Employee Relations"]
    },
    {
      "id": 5,
      "name": "David Lee",
      "department": "Sales",
      "yearsOfExperience": 6,
      "location": "Houston",
      "availability": "Full-time",
      "tags": ["Sales Strategy", "Negotiation"]
    },
    {
      "id": 6,
      "name": "Sarah Brown",
      "department": "Customer Support",
      "yearsOfExperience": 2,
      "location": "Miami",
      "availability": "Full-time",
      "tags": ["Customer Service", "Technical Support"]
    }
  ] ,
  sortBy: '',
  searchTerm:'',
  currentPage:1,
  employeesPerPage: 5
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (storedEmployees) {
      dispatch({
        type: 'SET_EMPLOYEES',
        payload: storedEmployees,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(state.employees));
  }, [state.employees]);

  function addEmployee(employee) {
    dispatch({
      type: "ADD_EMPLOYEE",
      payload: employee
    });
  }

  function editEmployee(employee) {
    dispatch({
      type: "EDIT_EMPLOYEE",
      payload: employee
    });
  }

  function removeEmployee(id) {
    dispatch({
      type: "REMOVE_EMPLOYEE",
      payload: id
    });
  }

  function setSortBy(sortBy) {
    dispatch({
      type: "SET_SORT_BY",
      payload: sortBy
    });
  }
  function setSearchTerm(searchTerm) {
    dispatch({
      type: "SET_SEARCH_TERM",
      payload: searchTerm
    });
  }
  function setCurrentPage(page) {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: page
    });
  }
  return (
    <GlobalContext.Provider
    value={{
        employees: state.employees,
        sortBy: state.sortBy,
        searchTerm: state.searchTerm,
        currentPage: state.currentPage,
        employeesPerPage: state.employeesPerPage,
        addEmployee,
        editEmployee,
        removeEmployee,
        setSortBy,
        setSearchTerm,
        setCurrentPage
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
