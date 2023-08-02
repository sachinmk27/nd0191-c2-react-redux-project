import { useRef } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUsers';

const LoginPage = ({ authedUser, users, dispatch }) => {
  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedUserId = ref.current.value;
    dispatch(setAuthedUser(selectedUserId));
  };
  return (
    <div className="container mx-auto px-4">
      <div className="prose text-center mx-auto mt-4 mb-12">
        <h2>Employee polls</h2>
        {authedUser && <p>Currently logged in as {authedUser.name}</p>}
      </div>
      <form
        className="form-control w-full max-w-xs mx-auto"
        onSubmit={handleSubmit}
      >
        <label className="label">
          <span className="label-text text-neutral">Change user account</span>
        </label>
        <select
          data-testid="user-select"
          className="select select-bordered"
          ref={ref}
        >
          {users.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          defaultValue="password"
        />
        <label className="label">
          <span className="label-text text-neutral-content">
            No password required
          </span>
        </label>

        <button className="btn btn-primary mt-4">Login</button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser: authedUser ? users[authedUser] : null,
    users: Object.values(users).map(({ id, name }) => ({ id, name })),
  };
};

export default connect(mapStateToProps)(LoginPage);
