import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ connectedUser }) => (
  <div>
    <h1>Profile</h1>
    <div>
      {connectedUser.username}
    </div>
  </div>
);

Profile.propTypes = {
  connectedUser: PropTypes.shape({
    username: PropTypes.string
  }).isRequired
};

export default Profile;
