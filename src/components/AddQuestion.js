import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';
import { connect } from 'react-redux';

const AddQuestion = ({ dispatch }) => {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const navigate = useNavigate('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion(optionOne, optionTwo));
    setOptionOne('');
    setOptionTwo('');
    navigate('/');
  };
  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 flex flex-col items-center">
      <div className="prose mt-8 mb-4 text-center mx-auto">
        <h1 className="mb-2">Would you rather ?</h1>
        <p>Create your own poll</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="form-control w-full max-w-xs mx-auto"
      >
        <div className=" w-full max-w-xs">
          <label htmlFor="optionOne" className="label">
            <span className="label-text">First Option</span>
          </label>
          <input
            type="text"
            name="optionOne"
            id="optionOne"
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
            placeholder="Option one"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="w-full max-w-xs mt-4">
          <label htmlFor="optionTwo" className="label">
            <span className="label-text">Second Option</span>
          </label>
          <input
            type="text"
            name="optionTwo"
            id="optionTwo"
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
            placeholder="Option two"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button
          disabled={optionOne === '' || optionTwo === ''}
          type="submit"
          className="btn btn-primary mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect()(AddQuestion);
