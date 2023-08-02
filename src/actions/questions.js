import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SET_QUESTION_ANSWER = 'SET_QUESTION_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';

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

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
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

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser: author } = getState();
    dispatch(showLoading());
    saveQuestion({ optionOneText, optionTwoText, author })
      .then((question) => {
        dispatch(addQuestion(question));
      })
      .then(() => {
        dispatch(hideLoading());
      })
      .catch((e) => {
        console.warn('Error in handleAddQuestion: ', e);
        alert('There was an error saving the question. Try again.');
      });
  };
}
