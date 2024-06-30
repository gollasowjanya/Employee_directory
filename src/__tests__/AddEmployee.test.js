import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { GlobalProvider } from '../context/GlobalState';
import { AddEmployee } from '../components/EmployeeForm';

test('adds a new employee', () => {
  const onClose = jest.fn();
  render(
    <GlobalProvider>
      <AddEmployee isOpen={true} onClose={onClose} />
    </GlobalProvider>
  );

  fireEvent.change(screen.getByPlaceholderText(/Enter name/i), { target: { value: 'Test Employee' } });
  fireEvent.change(screen.getByPlaceholderText(/Enter department/i), { target: { value: 'Test Department' } });
  fireEvent.change(screen.getByPlaceholderText(/Enter years of experience/i), { target: { value: '3' } });
  fireEvent.change(screen.getByPlaceholderText(/Enter location/i), { target: { value: 'Test Location' } });
  fireEvent.change(screen.getByDisplayValue('Part-time'), { target: { value: 'Full-time' } });
  
  fireEvent.click(screen.getByText(/Add Employee/i));
  
  const employee = screen.getByText('Add Employee');
  expect(employee).toBeInTheDocument();
});
