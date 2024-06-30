export default (state, action) => {
  switch (action.type) {
    case 'SET_EMPLOYEES':
      return {
        ...state,
        employees: action.payload
      };
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    case 'EDIT_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(employee =>
          employee.id === action.payload.id ? action.payload : employee
        )
      };
    case 'REMOVE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter(employee => employee.id !== action.payload)
      };
    case 'SET_SORT_BY':
      return {
        ...state,
        sortBy: action.payload
      };
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload
      };
    default:
      return state;
  }
};
