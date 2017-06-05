import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchSinglePost } from '../../actions/index';

class Post extends Component {
  static fetchData(params) {
    return fetchSinglePost(params);
  }

  componentDidMount() {
    this.props.fetchSinglePost();
  }

  render() {
    const { title, body } = this.props.post;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className="c-content">
          <h1>{title}</h1>
          <div>{body}</div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.number,
    lastViewed: PropTypes.number,
    userId: PropTypes.number
  }).isRequired,
  fetchSinglePost: PropTypes.func.isRequired
};

export default Post;
