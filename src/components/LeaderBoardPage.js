import React from 'react';
import { connect } from 'react-redux';

const LeaderBoardPage = ({ users, createdBy }) => {
  return (
    <div className="overflow-y-auto w-full max-w-screen-lg mx-auto px-4">
      <table className="table mt-8 table-zebra">
        <thead>
          <tr>
            <th>User</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={user.avatarURL} alt={user.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.id}</div>
                    </div>
                  </div>
                </td>
                <td>{Object.keys(user.answers).length}</td>
                <td>{user.questions.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = ({ users, questions }) => {
  return {
    users: Object.values(users).sort((a, b) => {
      const totalA = Object.keys(a.answers).length + a.questions.length;
      const totalB = Object.keys(b.answers).length + b.questions.length;
      return totalB - totalA;
    }),
  };
};
export default connect(mapStateToProps)(LeaderBoardPage);
