import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getConnectedUser } from '../../selectors/index';
import Profile from '../../components/Profile';

const ProfilePage = props => <Profile {...props} />;

ProfilePage.propTypes = {
  connectedUser: PropTypes.shape({
    id: PropTypes.number
  }).isRequired
};

const mapStateToProps = state => ({
  connectedUser: getConnectedUser(state)
});

export default connect(mapStateToProps)(ProfilePage);
