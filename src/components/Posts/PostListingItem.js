import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const PostsItem = ({ id, title }) => (
  <Link
    className="c-post-listing__item"
    title={title}
    to={`/posts/${id}`}
  >
    {title}
  </Link>);

PostsItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default PostsItem;
