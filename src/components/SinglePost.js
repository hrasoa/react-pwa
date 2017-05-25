import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SinglePost extends Component {
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
        <h1>{title}</h1>
        <div>{body}</div>
      </div>
    );
  }
}

SinglePost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.number,
    lastViewed: PropTypes.number,
    userId: PropTypes.number
  }).isRequired,
  fetchSinglePost: PropTypes.func.isRequired
};

export default SinglePost;
