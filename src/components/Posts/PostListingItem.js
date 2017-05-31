import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostsItem = ({ id, title }) => (
  <div>
    <Link to={`/posts/${id}`}>{title}</Link>
  </div>
);

PostsItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default PostsItem;
