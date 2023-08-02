import React from 'react';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children, authed }) => {
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};
const mapStateToProps = ({ authedUser }) => {
  return {
    authed: authedUser !== null,
  };
};
export default connect(mapStateToProps)(RequireAuth);
