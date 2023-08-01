import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import LoadingBar from 'react-redux-loading-bar';
import LoginPage from './components/LoginPage';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuestionPage from './components/QuestionPage';

const App = ({ dispatch, loading }) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      {loading === true ? (
        <LoginPage />
      ) : (
        <>
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/questions/:id" element={<QuestionPage />} />
          </Routes>
        </>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    loading: authedUser === null,
  };
};
export default connect(mapStateToProps)(App);
