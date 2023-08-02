import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { combineReducers, createStore } from 'redux';
import authedUser from '../reducers/authedUser';
import users from '../reducers/users';
import { _getUsers } from '../utils/_DATA';
import { receiveUsers } from '../actions/users';
import { setAuthedUser } from '../actions/authedUsers';

describe('LoginPage', () => {
  test('should have select input, login button', async () => {
    const store = createStore(combineReducers({ authedUser, users }));
    const usersData = await _getUsers();
    store.dispatch(receiveUsers(usersData));
    store.dispatch(setAuthedUser(Object.keys(usersData)[0]));
    const state = store.getState();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('user-select')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(
      screen.getByText(
        `Currently logged in as ${state.users[state.authedUser].name}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Currently logged in as ${state.users[state.authedUser].name}`
      )
    ).toBeInTheDocument();
  });
});
