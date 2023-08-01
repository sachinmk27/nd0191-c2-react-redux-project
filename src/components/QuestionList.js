import React from 'react';
import QuestionListItem from './QuestionListItem';

const QuestionList = ({ questionIds }) => {
  return questionIds.map((id) => <QuestionListItem key={id} id={id} />);
};

export default QuestionList;
