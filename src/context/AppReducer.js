export default function appReducer(state, action) {
    switch (action.type) {
      case "ADD_EMPLOYEE":
        return {
          ...state,
          employees: [...state.employees, action.payload],
        };
  
      case "EDIT_EMPLOYEE":
        const updatedEmployee = action.payload;
        const updatedEmployees = state.employees.map((employee) => {
          if (employee.id === updatedEmployee.id) {
            return updatedEmployee;
          }
          return employee;
        });
        return {
          ...state,
          employees: updatedEmployees,
        };
  
      case "REMOVE_EMPLOYEE":
        return {
          ...state,
          employees: state.employees.filter(
            (employee) => employee.id !== action.payload
          ),
        };
  
      case "SET_EMPLOYEES":
        return {
          ...state,
          employees: action.payload,
        };
  
      case "SET_SORT_BY":
        return {
          ...state,
          sortBy: action.payload,
        };

      case "SET_SEARCH_TERM":
        return {
            ...state,
            searchTerm: action.payload,
        };
      
       case "SET_CURRENT_PAGE":
         return {
            ...state,
            currentPage: action.payload,
         };
  
      default:
        return state;
    }
  };
  