import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadHomePage } from '../actions/index';
import Home from '../components/Home';

class HomePage extends Component {
  componentWillMount() {
    this.props.loadHomePage();
  }

  render() {
    return <Home {...this.props} />;
  }
}

HomePage.propTypes = {
  loadHomePage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const {
    entities: { posts, pictures },
    pagination: { latestPosts, latestPictures }
  } = state;

  return {
    latestPosts,
    latestPictures,
    posts,
    pictures
  };
};

export default connect(mapStateToProps, { loadHomePage })(HomePage);
