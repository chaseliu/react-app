import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './routers/Counter';


test('Renders Counter', () => {
  render(<Counter count={0} />);
  expect(screen.getByText(/\d times/)).toBeInTheDocument();
});

test("Clicks + Button", () => {
  render(<Counter count={0} />);
  fireEvent.click(screen.getByText('+'));
  expect(screen.getByText(/\d times/)).toHaveTextContent(/1/);
});
