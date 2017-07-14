import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  loadPostPage,
  leavePostPage
} from '../../actions/index';
import Post from '../../components/Posts/Post';

class PostPage extends Component {
  componentWillMount() {
    this.props.loadPostPage(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.props.loadPostPage(nextProps.id);
    }
  }

  componentWillUnmount() {
    this.props.leavePostPage();
  }

  render() {
    return <Post {...this.props} />;
  }
}

PostPage.propTypes = {
  id: PropTypes.number.isRequired,
  loadPostPage: PropTypes.func.isRequired,
  leavePostPage: PropTypes.func.isRequired
};

const mapStateToProps = (state, { match }) => {
  const id = parseInt(match.params.id, 10);
  const {
    entities: { posts }
  } = state;

  return {
    id,
    post: posts[id] || {}
  };
};

export default withRouter(connect(mapStateToProps, {
  loadPostPage,
  leavePostPage
})(PostPage));
