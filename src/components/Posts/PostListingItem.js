import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostsItem = ({ id, title }) => (
  <Link
    className="c-post-listing__item"
    title={title}
    to={`/posts/${id}`}
  >
    {title}
  </Link>);

PostsItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default PostsItem;
