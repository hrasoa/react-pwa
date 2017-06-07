import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { loadPostPage } from '../../actions/index';
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

  render() {
    const post = this.props.post;
    return <Post {...post} />;
  }
}

PostPage.defaultProps = {
  id: 0,
  post: {}
};

PostPage.propTypes = {
  id: PropTypes.number,
  post: PropTypes.shape({
    id: PropTypes.number
  }),
  loadPostPage: PropTypes.func.isRequired
};

const mapStateToProps = (state, { match }) => {
  const id = parseInt(match.params.id, 10);
  const {
    entities: { posts }
  } = state;

  return {
    id,
    post: posts[id]
  };
};

export default withRouter(connect(
  mapStateToProps, {
    loadPostPage
  }
)(PostPage));
