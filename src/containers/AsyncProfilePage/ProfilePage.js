import React from 'react';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../selectors/index';
import Profile from '../../components/Profile';
import { signOut } from '../../middlewares/firebase';

const ProfilePage = props => <Profile {...props} />;

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state)
});

export default connect(mapStateToProps, { signOut })(ProfilePage);
