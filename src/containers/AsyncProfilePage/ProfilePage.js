import React from 'react';
import { connect } from 'react-redux';
import { getConnectedUser } from '../../selectors/index';
import Profile from '../../components/Profile';
import { logoutRequest } from '../../actions/index';

const ProfilePage = props => <Profile {...props} />;

const mapStateToProps = state => ({
  connectedUser: getConnectedUser(state)
});

export default connect(mapStateToProps, { logoutRequest })(ProfilePage);
