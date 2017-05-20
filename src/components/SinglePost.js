import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SinglePost extends Component {
  componentDidMount() {
    this.props.fetchSinglePost();
  }

  render() {
    const { title, body } = this.props;
    return (
      <div>
        <h1>{title}</h1>
        <div>{body}</div>
      </div>
    );
  }
}

SinglePost.propTypes = {
  body: PropTypes.string.isRequired,
  fetchSinglePost: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default SinglePost;
