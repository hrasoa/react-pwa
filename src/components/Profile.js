import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ connectedUser, logoutRequest }) => (
  <div>
    <h1>Profile</h1>
    <div>
      {connectedUser.username}
    </div>
    <div>
      <button onClick={logoutRequest} type="button">Logout</button>
    </div>
  </div>
);

Profile.propTypes = {
  connectedUser: PropTypes.shape({
    username: PropTypes.string
  }).isRequired,
  logoutRequest: PropTypes.func.isRequired
};

export default Profile;
