import React from 'react';
import { connect } from 'react-redux';
import QuestionListItem from './QuestionListItem';
import QuestionList from './QuestionList';

const HomePage = ({ newQuestionIds, answeredQuestionIds }) => {
  return (
    <div className="w-full max-w-screen-lg mx-auto px-4">
      <div className="prose mt-8 mb-4">
        <h2>New Questions</h2>
      </div>
      <div className="flex flex-wrap gap-8">
        <QuestionList questionIds={newQuestionIds} />
      </div>
      <div className="flex flex-col w-full">
        <div className="divider"></div>
      </div>
      <div className="prose mt-8 mb-4">
        <h2>Done</h2>
      </div>
      <div className="flex flex-wrap gap-8">
        <QuestionList questionIds={answeredQuestionIds} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => {
  const currentUser = users[authedUser];
  return {
    authedUser: currentUser,
    newQuestionIds: Object.keys(questions)
      .filter((q) => !currentUser.answers[q])
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestionIds: Object.keys(questions)
      .filter((q) => currentUser.answers[q])
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  };
};

export default connect(mapStateToProps)(HomePage);
