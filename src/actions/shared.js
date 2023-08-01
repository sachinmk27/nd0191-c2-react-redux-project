import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getInitialData } from '../utils/api';
import { setAuthedUser } from './authedUsers';
import { receiveQuestions } from './questions';
import { receiveUsers } from './users';

const AUTHED_ID = 'sarahedo';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ questions, users }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(AUTHED_ID));
      dispatch(hideLoading());
    });
  };
}
