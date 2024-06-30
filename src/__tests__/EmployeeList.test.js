import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalProvider } from '../context/GlobalState';
import {EmployeeList} from '../components/EmployeeList';

test('renders employee list', () => {
  render(
    <Router>
      <GlobalProvider>
        <EmployeeList />
      </GlobalProvider>
    </Router>
  );

 
  const employeeElements = screen.getAllByTestId('employee');
  expect(employeeElements.length).toBeGreaterThan(0);
});
