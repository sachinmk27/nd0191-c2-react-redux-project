import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getInitialData } from '../utils/api';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ questions, users }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}
