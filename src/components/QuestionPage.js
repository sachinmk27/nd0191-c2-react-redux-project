import React, { useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { formatQuestion } from '../utils/helpers';
import { handleSetQuestionAnswer } from '../actions/questions';
import NotFoundPage from './NotFoundPage';

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };
  return ComponentWithRouterProp;
};

const QuestionPage = ({ question, dispatch }) => {
  const [option, setOption] = useState(question?.hasAnsweredOption);
  if (question === null) {
    return <NotFoundPage />;
  }
  const {
    authorName,
    authorAvatarURL,
    optionOne,
    optionTwo,
    hasAnsweredOption,
    noOfResponses,
  } = question;

  const handleOptionChange = (e) => {
    setOption(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleSetQuestionAnswer(question.id, option));
  };
  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 flex flex-col items-center">
      <div className="prose mt-8 mb-4 text-center mx-auto">
        <h2 className="text-slate-400">Poll by {authorName}</h2>
      </div>
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={authorAvatarURL} alt={authorName} />
        </div>
      </div>
      <div className="prose mt-8 mb-4 text-center mx-auto">
        <h1>Would you rather ?</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <div className="form-control">
          {hasAnsweredOption && (
            <div className="prose prose-sm mb-0">
              <p>
                Count:{noOfResponses.optionOne}, {noOfResponses.optionOnePC}%
              </p>
            </div>
          )}
          <label
            htmlFor="radio-option-1"
            className={classNames(
              'rounded-md',
              'label',
              'cursor-pointer',
              'bg-slate-200',
              'p-4',
              {
                'border-2 border-solid border-primary':
                  hasAnsweredOption === 'optionOne',
              }
            )}
          >
            <span className="label-text">{optionOne.text}</span>
            <input
              type="radio"
              id="radio-option-1"
              name="radio-option"
              className="radio checked:bg-primary"
              value="optionOne"
              onChange={handleOptionChange}
              checked={option === 'optionOne'}
              disabled={hasAnsweredOption}
            />
          </label>
        </div>
        <div className="form-control">
          {hasAnsweredOption && (
            <div className="prose prose-sm mb-0">
              <p>
                Count:{noOfResponses.optionTwo}, {noOfResponses.optionTwoPC}%
              </p>
            </div>
          )}
          <label
            htmlFor="radio-option-2"
            className={classNames(
              'rounded-md',
              'label',
              'cursor-pointer',
              'bg-slate-200',
              'p-4',
              {
                'border-2 border-solid border-primary':
                  hasAnsweredOption === 'optionTwo',
              }
            )}
          >
            <span className="label-text">{optionTwo.text}</span>

            <input
              type="radio"
              id="radio-option-2"
              name="radio-option"
              className="radio checked:bg-primary"
              value="optionTwo"
              onChange={handleOptionChange}
              checked={option === 'optionTwo'}
              disabled={hasAnsweredOption}
            />
          </label>
        </div>
        {hasAnsweredOption && (
          <div className="prose">
            <p>Total response: {noOfResponses.total}</p>
          </div>
        )}
        <button
          disabled={!option || hasAnsweredOption}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.router.params;
  const question = questions[id] || null;
  return {
    question: question
      ? formatQuestion(question, users[question.author], users[authedUser])
      : null,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
