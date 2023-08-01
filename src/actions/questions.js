import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { saveQuestionAnswer } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SET_QUESTION_ANSWER = 'SET_QUESTION_ANSWER';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function setQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: SET_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleSetQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(setQuestionAnswer({ authedUser, qid, answer }));
      })
      .then(() => {
        dispatch(hideLoading());
      })
      .catch((e) => {
        console.warn('Error in handleSetQuestionAnswer: ', e);
        alert('There was an error saving the answer. Try again.');
      });
  };
}
