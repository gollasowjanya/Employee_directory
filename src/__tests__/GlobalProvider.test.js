import React from 'react';
import { render, screen } from '@testing-library/react';
import { GlobalProvider, GlobalContext } from '../context/GlobalState';

const TestComponent = () => {
  const { employees } = React.useContext(GlobalContext);
  return (
    <div>
      {employees.map(employee => (
        <div key={employee.id} data-testid="employee">{employee.name}</div>
      ))}
    </div>
  );
};

test('renders initial employees from context', () => {
  render(
    <GlobalProvider>
      <TestComponent />
    </GlobalProvider>
  );

  const employeeElements = screen.getAllByTestId('employee');
  expect(employeeElements.length).toBe(10); 
});
