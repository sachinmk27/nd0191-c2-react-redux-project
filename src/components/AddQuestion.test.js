import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import AddQuestion from './AddQuestion';

describe('AddQuestion', () => {
  test('should disable submit button if any input fields is not filled', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddQuestion />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Submit')).toBeDisabled();
  });

  test('should disable submit button if only one input field is filled', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddQuestion />
        </MemoryRouter>
      </Provider>
    );
    const optionOneInputEl = screen.getByTestId('optionOne');
    fireEvent.change(optionOneInputEl, { target: { value: 'one' } });
    expect(screen.getByText('Submit')).toBeDisabled();
  });

  test('should not disable submit button if both input fields are filled', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddQuestion />
        </MemoryRouter>
      </Provider>
    );
    const optionOneInputEl = screen.getByTestId('optionOne');
    const optionTwoInputEl = screen.getByTestId('optionTwo');
    fireEvent.change(optionOneInputEl, { target: { value: 'one' } });
    fireEvent.change(optionTwoInputEl, { target: { value: 'two' } });
    expect(screen.getByText('Submit')).not.toBeDisabled();
  });
});
