import React, { useState } from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import classNames from 'classnames';

const HomePage = ({ newQuestionIds, answeredQuestionIds }) => {
  const [showNewPolls, setShowNewPolls] = useState(true);
  return (
    <div className="w-full max-w-screen-lg mx-auto px-4">
      <div className="tabs tabs-boxed my-4">
        <button
          onClick={() => setShowNewPolls(true)}
          href="#"
          className={classNames('tab', {
            'tab-active': showNewPolls,
          })}
        >
          New polls
        </button>
        <button
          onClick={() => setShowNewPolls(false)}
          href="#"
          className={classNames('tab', {
            'tab-active': !showNewPolls,
          })}
        >
          Answered
        </button>
      </div>
      <div className="flex flex-wrap gap-8 my-4">
        <QuestionList
          questionIds={showNewPolls ? newQuestionIds : answeredQuestionIds}
        />
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
