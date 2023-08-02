import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Nav from './Nav';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import authedUser from '../reducers/authedUser';
import users from '../reducers/users';
import { setAuthedUser } from '../actions/authedUsers';
import { _getUsers } from '../utils/_DATA';
import { receiveUsers } from '../actions/users';

describe('Nav', () => {
  test('snapshot', async () => {
    const store = createStore(combineReducers({ authedUser, users }));
    const usersData = await _getUsers();
    store.dispatch(receiveUsers(usersData));
    store.dispatch(setAuthedUser(Object.keys(usersData)[0]));

    const view = render(
      <Provider store={store}>
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });

  test('should have links', async () => {
    const store = createStore(combineReducers({ authedUser, users }));
    const usersData = await _getUsers();
    store.dispatch(receiveUsers(usersData));
    store.dispatch(setAuthedUser(Object.keys(usersData)[0]));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Nav />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
