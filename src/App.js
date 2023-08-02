import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import LoadingBar from 'react-redux-loading-bar';
import LoginPage from './components/LoginPage';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuestionPage from './components/QuestionPage';
import LeaderBoardPage from './components/LeaderBoardPage';
import AddQuestion from './components/AddQuestion';
import NotFoundPage from './components/NotFoundPage';
import RequireAuth from './components/RequireAuth';

const App = ({ dispatch }) => {
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Nav />
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <RequireAuth>
              <Nav />
              <QuestionPage />
            </RequireAuth>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <RequireAuth>
              <Nav />
              <LeaderBoardPage />
            </RequireAuth>
          }
        />
        <Route
          path="/add"
          element={
            <RequireAuth>
              <Nav />
              <AddQuestion />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <RequireAuth>
              <Nav />
              <NotFoundPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Fragment>
  );
};

export default connect()(App);
