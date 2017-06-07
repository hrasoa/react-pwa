import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component {
  componentDidMount() {
    this.props.fetchSinglePost();
  }

  render() {
    const { id, title, body } = this.props.post;
    return (
      <div className="c-content">
        <Helmet>
          <title>{title}</title>
          <link rel="canonical" href={`http://example.com/posts/${id}`} />
        </Helmet>
        <h1>{title}</h1>
        <p>{body}</p>
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
