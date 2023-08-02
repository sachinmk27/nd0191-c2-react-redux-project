import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import users from '../reducers/users';
import { _getUsers } from '../utils/_DATA';
import { receiveUsers } from '../actions/users';
import LeaderBoardPage from './LeaderBoardPage';

describe('LeaderBoardPage', () => {
  test('should display users with the correct info and in sorted order', async () => {
    const store = createStore(combineReducers({ users }));
    store.dispatch(receiveUsers(await _getUsers()));
    const state = store.getState();
    const usersInfo = Object.values(state.users).sort((a, b) => {
      const totalA = Object.keys(a.answers).length + a.questions.length;
      const totalB = Object.keys(b.answers).length + b.questions.length;
      return totalB - totalA;
    });
    render(
      <Provider store={store}>
        <LeaderBoardPage />
      </Provider>
    );
    const rows = screen.queryAllByTestId('leaderboard-row');
    const answers = screen.queryAllByTestId('leaderboard-answers');
    const questions = screen.queryAllByTestId('leaderboard-questions');
    rows.forEach((row, index) => {
      const actualAnswer = +answers[index].textContent;
      const expectedAnswer = Object.keys(usersInfo[index].answers).length;
      expect(actualAnswer).toBe(expectedAnswer);

      const actualQuestion = +questions[index].textContent;
      const expectedQuestion = usersInfo[index].questions.length;
      expect(actualQuestion).toBe(expectedQuestion);
    });
  });
});
