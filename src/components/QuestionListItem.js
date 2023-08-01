import { connect } from 'react-redux';
import { formatDate, formatQuestion } from '../utils/helpers';
import { Link } from 'react-router-dom';

const QuestionListItem = ({ question }) => {
  const { authorName, timestamp } = question;
  return (
    <div className="card w-64 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-slate-700">{authorName}</h2>
        <p className="text-slate-400">{formatDate(timestamp)}</p>
        <div className="card-actions">
          <Link
            to={`/questions/${question.id}`}
            className="btn btn-secondary btn-outline"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, { id }) => {
  const question = questions[id];
  return {
    question: formatQuestion(
      question,
      users[question.author],
      users[authedUser]
    ),
  };
};
export default connect(mapStateToProps)(QuestionListItem);
