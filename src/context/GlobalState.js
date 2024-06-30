import React, { createContext, useReducer, useEffect } from 'react';
import appReducer from './AppReducer';

const employees = [
  {
    id: 1,
    name: "John ",
    department: "Engineering",
    yearsOfExperience: 5,
    location: "New York",
    availability: "Full-time",
    tags: ["React", "Node.js"]
  },
  {
    id: 2,
    name: "Jack",
    department: "Marketing",
    yearsOfExperience: 3,
    location: "San Francisco",
    availability: "Part-time",
    tags: ["SEO", "Content Marketing"]
  },
  {
    id: 3,
    name: "Johnson",
    department: "Finance",
    yearsOfExperience: 7,
    location: "Chicago",
    availability: "Full-time",
    tags: ["Accounting", "Budgeting"]
  },
  {
    id: 4,
    name: "Devi",
    department: "Human Resources",
    yearsOfExperience: 4,
    location: "Los Angeles",
    availability: "Part-time",
    tags: ["Recruiting", "Employee Relations"]
  },
  {
    id: 5,
    name: "David ",
    department: "Sales",
    yearsOfExperience: 6,
    location: "Banglore",
    availability: "Full-time",
    tags: ["Sales Strategy", "Negotiation"]
  },
  {
    id: 6,
    name: "Sara",
    department: "Customer Support",
    yearsOfExperience: 2,
    location: "Miami",
    availability: "Full-time",
    tags: ["Customer Service", "Technical Support"]
  },
  {
    id: 7,
    name: "Sai",
    department: "Customer Executive",
    yearsOfExperience: 3,
    location: "UK",
    availability: "Full-time",
    tags: ["Customer Service"]
  },
  {
    id: 8,
    name: "Sreeja",
    department: "Associate Software Developer",
    yearsOfExperience: 4,
    location: "Mumbai",
    availability: "Full-time",
    tags: ["Developer" , "Web Applications", "SEO"]
  }, {
    id: 9,
    name: "vamsi",
    department: "Finance",
    yearsOfExperience: 3,
    location: "Zaheerabad",
    availability: "Part-time",
    tags: ["Finance", "Accounts"]
  }, {
    id: 10,
    name: "Madhu",
    department: "Admin",
    yearsOfExperience: 7,
    location: "Karnatak",
    availability: "Full-time",
    tags: ["Medical"]
  },
];

const initialState = {
  employees: [], 
  sortBy: '',
  searchTerm: '',
  currentPage: 1,
  employeesPerPage: 8,
  filters: {
    department: '',
    minExperience: '',
    maxExperience: '',
    location: '',
    availability: '',
    tags: []
  }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const storedEmployees = window.JSON.parse(localStorage.getItem('employees'));
    if (storedEmployees && storedEmployees.length > 0) {
      console.log('Loading employees from localStorage');
      dispatch({
        type: 'SET_EMPLOYEES',
        payload: storedEmployees,
      });
    } else {
      console.log('Loading default employees');
      dispatch({
        type: 'SET_EMPLOYEES',
        payload: employees,
      });
    }
  }, []);

  useEffect(() => {
    console.log('Updating localStorage', state.employees);
    window.localStorage.setItem('employees', JSON.stringify(state.employees));
  }, [state.employees]);

  function addEmployee(employee) {
    dispatch({
      type: 'ADD_EMPLOYEE',
      payload: employee,
    });
  }

  function editEmployee(employee) {
    dispatch({
      type: 'EDIT_EMPLOYEE',
      payload: employee,
    });
  }

  function removeEmployee(id) {
    dispatch({
      type: 'REMOVE_EMPLOYEE',
      payload: id,
    });
  }

  function setSortBy(sortBy) {
    dispatch({
      type: 'SET_SORT_BY',
      payload: sortBy,
    });
  }

  function setSearchTerm(searchTerm) {
    dispatch({
      type: 'SET_SEARCH_TERM',
      payload: searchTerm,
    });
  }

  function setCurrentPage(page) {
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: page,
    });
  }

  function setFilters(filters) {
    dispatch({
      type: 'SET_FILTERS',
      payload: filters,
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
        filters: state.filters,
        addEmployee,
        editEmployee,
        removeEmployee,
        setSortBy,
        setSearchTerm,
        setCurrentPage,
        setFilters,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
