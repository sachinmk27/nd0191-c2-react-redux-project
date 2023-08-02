import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUsers';

const Nav = ({ authedUser, dispatch }) => {
  const handleLogout = () => {
    dispatch(setAuthedUser(null));
  };
  return (
    <div className="navbar bg-primary text-base-100">
      <nav className="flex-1">
        <ul className="flex gap-2">
          <li>
            <Link className="btn btn-link text-base-100 no-underline" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className="btn btn-link text-base-100 no-underline"
              to="/leaderboard"
            >
              Leaderboard
            </Link>
          </li>
          <li>
            <Link className="btn btn-link text-base-100 no-underline" to="/add">
              New
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex gap-4">
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={authedUser.avatarURL} alt={authedUser.name} />
          </div>
        </div>
        <p>{authedUser.name}</p>
        <button onClick={handleLogout} className="btn btn-sm bg-base-100">
          Logout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser: users[authedUser],
  };
};

export default connect(mapStateToProps)(Nav);
