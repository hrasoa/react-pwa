import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ currentUser, signOut }) => (
  <div>
    <h1>Profile</h1>
    <div>
      <ul>
        <li>id: {currentUser.id}</li>
        <li>uid: {currentUser.uid}</li>
      </ul>
    </div>
    <div>
      <button onClick={signOut} type="button">Logout</button>
    </div>
  </div>
);

Profile.propTypes = {
  currentUser: PropTypes.shape({
    uid: PropTypes.string
  }).isRequired,
  signOut: PropTypes.func.isRequired
};

export default Profile;
