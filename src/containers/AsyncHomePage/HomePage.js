import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  loadHomePage,
  leaveHomePage
} from '../../actions/index';
import Home from '../../components/Home';
import { getLatestPosts } from '../../selectors/index';

class HomePage extends Component {
  componentWillMount() {
    this.props.loadHomePage();
  }

  componentWillUnmount() {
    this.props.leaveHomePage();
  }

  render() {
    return <Home {...this.props} />;
  }
}

HomePage.propTypes = {
  loadHomePage: PropTypes.func.isRequired,
  leaveHomePage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  latestPosts: getLatestPosts(state)
});

export default connect(mapStateToProps, {
  loadHomePage,
  leaveHomePage
})(HomePage);
